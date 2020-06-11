defmodule RaiseServer.SectionBuilder.FreeOnlyNowTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory, OnlyNowData, ScreenSettingUtils}
  alias RaiseServer.SectionBuilder.{FreeOnlyNow, Utils}

  describe "process_sections/3" do
    setup do
      app = AppsFactory.insert(:app)
      [app: app]
    end

    test "generates limited_time_free section", %{app: app} do
      now = DateTime.utc_now() |> DateTime.truncate(:second)
      work = DepotFactory.insert(:work, %{episode_work_type: 4})
      DepotFactory.insert(:work_app, %{app: app, work: work})
      content = DepotFactory.insert(
        :content,
        %{
          name: "[第1話]僕のヒーローアカデミア",
          work: work,
          free_ppv_period1_begin_at: now,
          free_ppv_period2_begin_at: now,
        }
      )
      DepotFactory.insert(:content_app, %{content: content, app: app})
      DepotFactory.insert(:content_assessment, %{content: content})
      %{setting: screen_setting} =
        AppsFactory.insert(
          :app_screen_setting,
          %{
            app: app,
            screen: :free_only_now,
            setting: OnlyNowData.app_screen_setting_json_str(work.id, content.id)
          }
        )

      work_id = "ew#{work.id}"
      work_title = work.title
      image = Utils.format_image(work.images.image1)
      target_section =
        screen_setting
        |> :jsx.decode(return_maps: true)
        |> ScreenSettingUtils.find_section("limited_time_free")
      %{"works" => works} = FreeOnlyNow.process(target_section, app.id, now)
      assert [%{
        "id" => ^work_id,
        "title" => ^work_title,
        "image" => ^image,
        "update_display_string" => "第1話更新"
      }] = works
    end

    test "generates read_in_one_go section", %{app: app} do
      now = DateTime.utc_now() |> DateTime.truncate(:second)
      work = DepotFactory.insert(:work, %{publish_begin_at: DateTime.add(now, -3600 * 24 * 8, :second)})
      DepotFactory.insert(:work_app, %{app: app, work: work})
      campaign = DepotFactory.insert(:campaign)
      work_campaign = DepotFactory.insert(:work_campaign, %{free_range: "1-30", work: work, campaign: campaign})
      DepotFactory.insert(:work_campaign_app, %{app: app, work_campaign: work_campaign})
      content = DepotFactory.insert(:content, %{work: work})
      DepotFactory.insert(:content_app, %{content: content, app: app})
      %{setting: screen_setting} =
        AppsFactory.insert(
          :app_screen_setting,
          %{
            app: app,
            screen: :free_only_now,
            setting: OnlyNowData.app_screen_setting_json_str(work.id, content.id)
          }
        )

      work_id = "ew#{work.id}"
      work_title = work.title
      image = Utils.format_image(work.images.image1)
      end_at = work_campaign.end_at
      free_range_display_string = work_campaign.free_range_display_string

      target_section =
        screen_setting
        |> :jsx.decode(return_maps: true)
        |> ScreenSettingUtils.find_section("read_in_one_go")
      %{"works" => works} = FreeOnlyNow.process(target_section, app.id, now)
      is_recommended = work_id == target_section["recommended_work_id"]

      assert [%{
        "id" => ^work_id,
        "title" => ^work_title,
        "image" => ^image,
        "end_at" => ^end_at,
        "new_rensai_badge" => false,
        "is_recommended" => ^is_recommended,
        "free_range_display_string" => ^free_range_display_string,
      }] = works
    end

    test "generates limited_time_free_comic section", %{app: app} do
      now = DateTime.utc_now() |> DateTime.truncate(:second)
      work = DepotFactory.insert(:work)
      DepotFactory.insert(:work_app, %{app: app, work: work})
      content = DepotFactory.insert(:content, %{work: work, free_for_limited_time: true})
      DepotFactory.insert(:content_app, %{content: content, app: app})
      %{setting: screen_setting} =
        AppsFactory.insert(
          :app_screen_setting,
          %{
            app: app,
            screen: :free_only_now,
            setting: OnlyNowData.app_screen_setting_json_str(work.id, content.id)
          }
        )

      content_id = "ec#{content.id}"
      name = content.name
      thumbnail_image = Utils.format_image(content.thumbnail_image)
      end_at = content.publish_end_at

      target_section =
        screen_setting
        |> :jsx.decode(return_maps: true)
        |> ScreenSettingUtils.find_section("limited_time_free_comic")
      %{"contents" => contents} = FreeOnlyNow.process(target_section, app.id, now)

      assert [%{
        "id" => ^content_id,
        "name" => ^name,
        "thumbnail_image" => ^thumbnail_image,
        "end_at" => ^end_at,
      }] = contents
    end
  end
end
