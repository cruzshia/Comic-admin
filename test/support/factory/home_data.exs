defmodule RaiseServer.HomeData do

  alias RaiseServer.{AppsFactory, DepotFactory, ScreenSettingUtils}

  def create_resources(app) do

    %{setting: setting_str} = AppsFactory.insert(:home_screen, %{app: app})
    setting = :jsx.decode(setting_str, return_maps: true)

    work = DepotFactory.insert(:work)
    content = DepotFactory.insert(:content, %{work: work})
    DepotFactory.insert(:work_app, %{work: work, app: app})
    DepotFactory.insert(:content_app, %{content_id: content.id, app: app})

    # daily_ranking section
    Date.range(~D[2020-05-11], ~D[2020-05-17])
    |> Enum.each(fn date ->
      {:ok, utc_datetime, _} = date |> Date.to_iso8601() |> Kernel.<>("T00:00:00Z") |> DateTime.from_iso8601()
      for n <- 100..103 do
        work = DepotFactory.insert(:episode_work)
        DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app.id})
        content = DepotFactory.insert(:episode_content, %{work: work, publish_begin_at: utc_datetime})
        DepotFactory.insert(:content_app, %{content_id: content.id, app_id: app.id})
        DepotFactory.insert(:content_assessment, %{content_id: content.id, view_count: n, like_count: n, comment_count: n})
      end
    end)

    # free_only_now section
    fon_campaign = DepotFactory.insert(:campaign)
    fon_work = DepotFactory.insert(:work)
    fon_work_campaign = DepotFactory.insert(:work_campaign, %{work: fon_work, campaign_id: fon_campaign.id})
    DepotFactory.insert(:work_app, %{work: fon_work, app: app})
    DepotFactory.insert(:work_campaign_app, %{work_campaign_id: fon_work_campaign.id, app: app})

    # works section
    %{"work_ids" => prefixed_ids} = ScreenSettingUtils.find_section(setting, "works")
    for <<_::binary-size(2), _id_str::binary>> <- prefixed_ids do
      work = DepotFactory.insert(:episode_work)
      DepotFactory.insert(:work_app, %{work: work, app: app})
    end

    # subscription section
    %{"subscription_id" => "sb" <> sub_id_str} = ScreenSettingUtils.find_section(setting, "subscription")
    sub_id = sub_id_str |> String.to_integer
    sub = DepotFactory.insert(:subscription, %{id: sub_id})
    sub_work = DepotFactory.insert(:magazine_work, %{subscription_id: sub.id, is_main_work_of_subscription: true})
    DepotFactory.insert(:work_app, %{work: sub_work, app: app})
    %{id: magazine_content_id} = DepotFactory.insert(:magazine_content, %{work: sub_work})
    DepotFactory.insert(:content_app, %{content_id: magazine_content_id, app: app})

    app
  end

  def app_screen_setting_json_str() do
    """
    {
      "sections": [
        // ??????????????????
        {
          "type": "top_banners",
          "auto_slide_duration": 5,
          "banners": [
            {
              "action_url": "jumpplus://works/ew1",
              "url": "https://delivery.demo.raise.access-dpe.com/top/banner/top/47hJ9ED7n/191022/top1.jpg",
              "width": 750,
              "height": 400
            },
            {
              "action_url": "jumpplus://works/ew2",
              "url": "https://delivery.demo.raise.access-dpe.com/top/banner/top/47hJ9ED7n/191022/top2.jpg",
              "width": 750,
              "height": 400
            }
          ]
        },

        // ????????????????????????
        {
          "type": "daily_ranking",
          "bgcolor": "#EE3632",
          "color": "#FFEA28",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_daily_ranking.png",
            "width": 52,
            "height": 26
          },
          "title": "??????????????????!",
          "daily_rankings": {
            "monday": {
              "recommended_work_image": {
                "url": "https://delivery.demo.raise.access-dpe.com/dummy/recommended_work_image.png",
                "width": 121,
                "height": 91
              }
            },
            "tuesday": {
              "recommended_work_image": {
                "url": "https://delivery.demo.raise.access-dpe.com/dummy/recommended_work_image.png",
                "width": 121,
                "height": 91
              },
            },
            "wednesday": {},
            "thursday": {},
            "friday": {},
            "saturday": {},
            "sunday": {}
          },
        },

        // ???????????????
        {
          "type": "free_only_now",
          "bgcolor": "#FFFFFF",
          "color": "#000000",
          "title": "????????????????????????????????????",
          "link": {
            "text": "???????????????",
            "action_url": "jumpplus://free?tab=only_now"
          }
        },

        // ???????????????
        {
          "type": "ranking",
          "bgcolor": "#000000",
          "color": "#FFFFFF",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_free_work.png",
            "width": 136,
            "height": 17
          },
          "title": "???????????????????????????",
          "link": {
            "text": "???????????????",
            "action_url": "jumpplus://ranking"
          },
          "rankings": [
            {
                "title": "??????",
                "ranking_type": "overall"
            },
            {
                "title": "???????????????",
                "ranking_type": "iijan"
            },
            {
                "title": "??????",
                "ranking_type": "men"
            },
            {
                "title": "??????",
                "ranking_type": "women"
            },
            {
                "title": "??????",
                "ranking_type": "one_shot"
            },
            {
                "title": "????????????",
                "ranking_type": "rookie"
            }
          ]
        },

        // ???????????????
        {
          "type": "works",
          "title": "??????????????????",
          "work_ids": [
            "ew1", // ???????????????
            "ew2"  // ???????????????
          ]
        },

        // ????????????
        {
          "type": "sample_images",
          "bgcolor": "#000000",
          "color": "#FFFFFF",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_free_work.png",
            "width": 136,
            "height": 17
          },
          "title": "?????????????????????!",
          "sample_images": [
            {
              "image": {
                "url": "https://webview.shonenjump.com/fmc/191226/05_chiramise/chira1.jpg?timestamp=191226",
                "width": 575,
                "height": 840
              },
              "action_url": "jumpplus://works/ew1",
              "title": "???????????????",
              "description": "?????????????????????????????????"
            },
            {
              "image": {
                "url": "https://webview.shonenjump.com/fmc/191226/05_chiramise/chira2.jpg?timestamp=191226",
                "width": 575,
                "height": 840
              },
              "action_url": "jumpplus://works/ew2",
              "title": "?????????????????????",
              "description": "????????????????????????????????2????????????!!"
            },
            // ??????
          ]
        },

        // ???????????????????????????
        {
          "type": "rookie_ranking",
          "bgcolor": "#FFFFFF",
          "color": "#01A2F2",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_rookie.png",
            "width": 116,
            "height": 23
          },
          "title": "???????????????",
          "link": {
            "text": "???????????????",
            "action_url": "https://rookie.shonenjump.com?landing_from_app=1"
          },
          "description": "??????????????????????????????????????????????????????",
        },

        // ??????????????????????????????
        {
          "type": "rookie_pickup",
          "bgcolor": "#01A2F2",
          "color": "#FFFFFF",
          "title": "????????????????????????",
        },

        // ????????????????????????
        {
          "type": "subscription",
          "bgcolor": "#000000",
          "color": "#FFFFFF",
          "title": "????????????????????????",
          "link": {
            "text": "???????????????????????????",
            "action_url": "jumpplus://magazine-top?subscription_id=sb1"
          },
          "subscription_id": "sb1" // ????????????????????????????????????
        },

        // ????????????
        {
          "type": "books",
          "title": "?????????????????????????????????",
          "description": "???????????????????????????????????????",
          "link": {
            "text": "???????????????",
            "action_url": "jumpplus://comic-store-top"
          },
          "content_ids": [
            "ec1", // ???????????????23???
            "cc2"  // ?????????????????????????????????????????????????????????????????? 15
            // ??????
          ]
        },

        // ??????
        {
          "type": "search",
        },

        // ?????????
        {
          "type": "banners",
          "title": "??????????????????????????????",
          "banners": [
            {
              "url": "https://webview.shonenjump.com/fmc/200413/waku2/w2-1.jpg?timestamp=200413",
              "width": 750,
              "height": 235,
              "action_url": "jumpplus://works/ew1",
            },
            {
              "url": "https://webview.shonenjump.com/fmc/200413/waku2/w2-2.jpg?timestamp=200413",
              "width": 750,
              "height": 235,
              "action_url": "jumpplus://works/ew2",
            }
          ]
        }
      ]
    }
    """
  end
end
