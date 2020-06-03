defmodule RaiseServer.SectionBuilder.HomeTest do
  use RaiseServer.RepoCase

  alias RaiseServer.TimeZoneDatabase
  alias RaiseServer.{AppsFactory, CurationFactory, DepotFactory, ScreenSettingUtils}
  alias RaiseServer.SectionBuilder
  alias SectionBuilder.Home

  describe "process/3" do
    setup do
      app = AppsFactory.insert(:app)
      screen_setting = AppsFactory.insert(:home_screen, %{app_id: app.id})
      now = DateTime.utc_now() |> DateTime.truncate(:second)
      [app: app, app_screen_setting: screen_setting, now: now]
    end

    test "process section when 'type' is 'ranking'", context do
      %{app: app, app_screen_setting: %{setting: setting_str}} = context

      ranking_section = ScreenSettingUtils.find_section(setting_str, "ranking")
      tag = CurationFactory.insert(:tag)
      work = DepotFactory.insert(:work)
      DepotFactory.insert(:work_app, %{app_id: app.id, work_id: work.id})
      work_assessment = DepotFactory.insert(:work_assessment, %{work_id: work.id})
      CurationFactory.insert(:work_tag, %{tag_id: tag.id, work_id: work.id})

      target_rankings = Enum.map(ranking_section["rankings"], fn %{"ranking_type" => ranking_type} = ranking ->
        case ranking_type do
          "overall" ->
            Map.put(ranking, "works", [%{
              "action_url"        => "jumpplus://works/ew#{work.id}",
              "comment_count"     => work_assessment.comment_count,
              "description"       => work.description,
              "image"             => work.images.image1,
              "new_episode_badge" => false,
              "title"             => work.title,
              "view_count"        => work_assessment.view_count,
            }])
          _ ->
            Map.put(ranking, "works", [])
        end
      end)
      target_section = ranking_section |> Map.put("rankings", target_rankings) |> :jsx.encode

      assert %{"sections" => [resp_section]} = Home.process(app.id, DateTime.utc_now(), %{"sections" => [ranking_section]})
      assert resp_section |> :jsx.encode == target_section
    end

    test "process only section when 'type' is 'daily_ranking'", ctx do
      %{app: app, app_screen_setting: %{setting: setting_str}, now: now} = ctx
      section = ScreenSettingUtils.find_section(setting_str, "daily_ranking")

      random_offset = -1..-6
      |> Enum.shuffle()

      for offset_by <- random_offset do
        jst_dt =
          now
          |> DateTime.shift_zone("Asia/Tokyo", TimeZoneDatabase)
          |> elem(1)
          |> Map.merge(%{hour: 0, minute: 0, second: 0, microsecond: {0, 0}})
          |> DateTime.add(3600 * 24 * offset_by, :second, TimeZoneDatabase)

        for n <- 101..103 do
          work = DepotFactory.insert(:episode_work)
          DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app.id})
          content = DepotFactory.insert(:episode_content, %{work: work, publish_begin_at: DateTime.shift_zone(jst_dt, "Etc/UTC") |> elem(1)})
          DepotFactory.insert(:content_app, %{content: content, app_id: app.id})
          DepotFactory.insert(:content_assessment, %{content: content, view_count: n, like_count: n, comment_count: n})
        end
      end

      assert %{"sections" => [section_result]} =
        Home.process(app.id, DateTime.utc_now(), %{"sections" => [section]})

      assert %{"type" => _, "color" => _, "title_image" => _, "title" => _, "daily_rankings" => d_ranking} = section_result

      assert Enum.flat_map(d_ranking, & Map.keys(&1) |> List.flatten) == ~w/monday tuesday wednesday thursday friday saturday sunday/

      assert day_works = d_ranking |> Enum.flat_map(& &1 |> Enum.into([]) |> List.first() |> elem(1) |> Map.get("works"))

      day_works |> Enum.each(&
        assert Map.keys(&1) == ~w/action_url badge comment_count landscape_image rookie_badge square_image title view_count/
      )
    end

    test "process only section when 'type' is 'works'", ctx do
      %{app: app, app_screen_setting: %{setting: setting_str}} = ctx
      %{"title" => orig_title, "work_ids" => prefixed_ids} = section = ScreenSettingUtils.find_section(setting_str, "works")

      for <<_::binary-size(2), id_str::binary>> <- prefixed_ids do
        %{id: work_id} = DepotFactory.insert(:episode_work, %{id: id_str |> String.to_integer})
        DepotFactory.insert(:work_app, %{work_id: work_id, app_id: app.id})
      end

      assert %{"sections" => [resp_section]} =
        Home.process(app.id, DateTime.utc_now(), %{"sections" => [section]})
      assert %{title: ^orig_title} = resp_section
      assert Enum.count(resp_section.works) == 2
    end

    test "process section when 'type' is 'subscription'", ctx do
      %{app: app, app_screen_setting: %{setting: setting_str}} = ctx
      %{"subscription_id" => "sb" <> sub_id_str} = section = ScreenSettingUtils.find_section(setting_str, "subscription")

      sub_id = sub_id_str |> String.to_integer
      sub = DepotFactory.insert(:subscription, %{id: sub_id})
      work = DepotFactory.insert(:magazine_work, %{subscription_id: sub.id, is_main_work_of_subscription: true})

      DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app.id})
        %{id: content_id, thumbnail_image: image} = DepotFactory.insert(:magazine_content, %{
        work_id: work.id
      })
      DepotFactory.insert(:content_app, content_id: content_id, app: app)

      response_image =
        image
        |> Map.delete(:__struct__)
        |> :jsx.encode
        |> :jsx.decode(return_maps: true)
        |> (fn image ->
          %{
            url:    "https://" <> "" <> "/" <> image["path"],
            width:  image["width"],
            height: image["height"],
          }
        end).()

      assert %{"sections" => [resp_section]} =
        Home.process(app.id, DateTime.utc_now(), %{"sections" => [section]})
      assert resp_section |> :jsx.encode ==
        section
        |> Map.put_new("latest_content", %{
          "id" => "mc#{content_id}",
          "image" => response_image
        })
        |> :jsx.encode
    end

    test "section type is top_banners", %{app: app, app_screen_setting: %{setting: setting_str}, now: now} do
      top_banners_setting = ScreenSettingUtils.find_section(setting_str, "top_banners")
      assert ^top_banners_setting = Home.process_section(top_banners_setting, app.id, now)
    end

    test "section type is free_only_now", %{app: app, app_screen_setting: %{setting: setting_str}, now: now} do
      free_only_now_setting = ScreenSettingUtils.find_section(setting_str, "free_only_now")
      end_at1 = DateTime.add(now, 3600)
      end_at2 = DateTime.add(now, 7200)

      campaign1 = DepotFactory.insert(:campaign)
      work1 = DepotFactory.insert(:work)
      work_campaign1 = DepotFactory.insert(
        :work_campaign,
        %{work_id: work1.id, campaign_id: campaign1.id, end_at: end_at1}
      )
      DepotFactory.insert(:work_app, %{work_id: work1.id, app_id: app.id})
      DepotFactory.insert(:work_campaign_app, %{work_campaign_id: work_campaign1.id, app_id: app.id})

      campaign2 = DepotFactory.insert(:campaign)
      work2 = DepotFactory.insert(:work)
      work_campaign2 = DepotFactory.insert(
        :work_campaign,
        %{work_id: work2.id, campaign_id: campaign2.id, end_at: end_at2}
      )
      DepotFactory.insert(:work_app, %{work_id: work2.id, app_id: app.id})
      DepotFactory.insert(:work_campaign_app, %{work_campaign_id: work_campaign2.id, app_id: app.id})

      campaign3 = DepotFactory.insert(:campaign)
      work3 = DepotFactory.insert(:work)
      work_campaign3 = DepotFactory.insert(
        :work_campaign,
        %{work_id: work3.id, campaign_id: campaign3.id, end_at: end_at1}
      )
      DepotFactory.insert(:work_app, %{work_id: work3.id, app_id: app.id})
      DepotFactory.insert(:work_campaign_app, %{work_campaign_id: work_campaign3.id, app_id: app.id})

      free_only_now = Home.process_section(free_only_now_setting, app.id, now)
      free_only_now_works = free_only_now["works"]
      action_url1 = "jumpplus://works/ew#{work1.id}"
      action_url2 = "jumpplus://works/ew#{work2.id}"
      action_url3 = "jumpplus://works/ew#{work3.id}"
      order_action_urls = [action_url1, action_url3, action_url2]

      assert ^free_only_now_setting = Map.delete(free_only_now, "works")

      Enum.zip(order_action_urls, free_only_now_works)
      |> Enum.each(fn {action_url, free_only_now_work} ->
        assert %{
          action_url: ^action_url,
          title: _,
          end_date: _,
          free_range_display_string: _,
          image: %{
            url: _,
            height: _,
            width: _,
          }
        } = free_only_now_work
      end)
    end
  end
end
