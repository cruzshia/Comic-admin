defmodule RaiseServer.SectionBuilder.HomeTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory, HomeData, ScreenSettingUtils}
  alias RaiseServer.SectionBuilder
  alias RaiseServer.SectionBuilder.Home

  describe "process_section/3" do
    setup do
      app = AppsFactory.insert(:app)
      setting_str = HomeData.app_screen_setting_json_str()
      setting = :jsx.decode(setting_str, return_maps: true)
      now = DateTime.utc_now() |> DateTime.truncate(:second)
      [app: app, setting: setting, now: now]
    end

    test "section type is top_banners", %{app: app, setting: setting, now: now} do
      top_banners_setting = ScreenSettingUtils.find_section(setting, "top_banners")
      assert ^top_banners_setting = Home.process_section(top_banners_setting, app.id, now)
    end

    test "section type is subscription", %{app: app, setting: setting, now: now} do
      %{"subscription_id" => "sb" <> sub_id_str} = section = ScreenSettingUtils.find_section(setting, "subscription")

      sub_id = String.to_integer(sub_id_str)
      sub = DepotFactory.insert(:subscription, %{id: sub_id})
      work = DepotFactory.insert(:magazine_work, %{subscription_id: sub.id, is_main_work_of_subscription: true})

      DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app.id})
      %{id: content_id, thumbnail_image: image} = DepotFactory.insert(
        :magazine_content,
        %{work_id: work.id}
      )
      DepotFactory.insert(:content_app, %{content_id: content_id, app_id: app.id})

      response = Map.put_new(section, "latest_content", %{
        "id" => "mc#{content_id}",
        "image" => SectionBuilder.Utils.format_image(image)
      })

      assert ^response = Home.process_section(section, app.id, now)
    end

    test "section type is free_only_now", %{app: app, setting: setting, now: now} do
      free_only_now_setting = ScreenSettingUtils.find_section(setting, "free_only_now")
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
