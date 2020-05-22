defmodule RaiseServer.HomeData do
  import RaiseServer.ScreenSettingUtils

  alias RaiseServer.{AppsFactory, DepotFactory}

  def create_resources(app) do

    %{setting: setting_str} = AppsFactory.insert(:home_screen, %{app_id: app.id})

    work = DepotFactory.insert(:work)
    content = DepotFactory.insert(:content, %{work_id: work.id})
    DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app.id})
    DepotFactory.insert(:content_app, %{content_id: content.id, app_id: app.id})

    # free_only_now section
    fon_campaign = DepotFactory.insert(:campaign)
    fon_work = DepotFactory.insert(:work)
    fon_work_campaign = DepotFactory.insert(:work_campaign, %{work_id: fon_work.id, campaign_id: fon_campaign.id})
    DepotFactory.insert(:work_app, %{work_id: fon_work.id, app_id: app.id})
    DepotFactory.insert(:work_campaign_app, %{work_campaign_id: fon_work_campaign.id, app_id: app.id})

    # works section
    %{"work_ids" => prefixed_ids} = find_section(setting_str, "works")
    for <<_::binary-size(2), _id_str::binary>> <- prefixed_ids do
      %{id: work_id} = DepotFactory.insert(:episode_work)
      DepotFactory.insert(:work_app, %{work_id: work_id, app_id: app.id})
    end

    # subscription section
    %{"subscription_id" => "sb" <> sub_id_str} = find_section(setting_str, "subscription")
    sub_id = sub_id_str |> String.to_integer
    sub = DepotFactory.insert(:subscription, %{id: sub_id})
    sub_work = DepotFactory.insert(:magazine_work, %{subscription_id: sub.id, is_main_work_of_subscription: true})
    DepotFactory.insert(:work_app, %{work_id: sub_work.id, app_id: app.id})
    DepotFactory.insert(:magazine_content, %{work_id: sub_work.id})

    app
  end

  def app_screen_setting_json_str() do
    """
    {
      "sections": [
        // トップバナー
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

        // 今日のランキング
        {
          "type": "daily_ranking",
          "bgcolor": "#EE3632",
          "color": "#FFEA28",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_daily_ranking.png",
            "width": 52,
            "height": 26
          },
          "title": "初回全話無料!",
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

        // 今だけ無料
        {
          "type": "free_only_now",
          "bgcolor": "#FFFFFF",
          "color": "#000000",
          "title": "あの名作も！今だけ無料！",
          "link": {
            "text": "すべて見る",
            "action_url": "jumpplus://free?tab=only_now"
          }
        },

        // ランキング
        {
          "type": "ranking",
          "bgcolor": "#000000",
          "color": "#FFFFFF",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_free_work.png",
            "width": 136,
            "height": 17
          },
          "title": "総合人気ランキング",
          "link": {
            "text": "もっと見る",
            "action_url": "jumpplus://ranking"
          },
          "rankings": [
            {
                "title": "総合",
                "ranking_type": "overall"
            },
            {
                "title": "いいジャン",
                "ranking_type": "iijan"
            },
            {
                "title": "男性",
                "ranking_type": "men"
            },
            {
                "title": "女性",
                "ranking_type": "women"
            },
            {
                "title": "読切",
                "ranking_type": "one_shot"
            },
            {
                "title": "ルーキー",
                "ranking_type": "rookie"
            }
          ]
        },

        // 作品リスト
        {
          "type": "works",
          "title": "人気急上昇！",
          "work_ids": [
            "ew1", // 猫田びより
            "ew2"  // カラダ探し
          ]
        },

        // チラ見せ
        {
          "type": "sample_images",
          "bgcolor": "#000000",
          "color": "#FFFFFF",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_free_work.png",
            "width": 136,
            "height": 17
          },
          "title": "中身をチラ見せ!",
          "sample_images": [
            {
              "image": {
                "url": "https://webview.shonenjump.com/fmc/191226/05_chiramise/chira1.jpg?timestamp=191226",
                "width": 575,
                "height": 840
              },
              "action_url": "jumpplus://works/ew1",
              "title": "秘密の果実",
              "description": "初めて触れる愛の味――"
            },
            {
              "image": {
                "url": "https://webview.shonenjump.com/fmc/191226/05_chiramise/chira2.jpg?timestamp=191226",
                "width": 575,
                "height": 840
              },
              "action_url": "jumpplus://works/ew2",
              "title": "むとうとさとう",
              "description": "女子力高い男子のドキ×2ラブコメ!!"
            },
            // 省略
          ]
        },

        // ルーキーランキング
        {
          "type": "rookie_ranking",
          "bgcolor": "#FFFFFF",
          "color": "#01A2F2",
          "title_image": {
            "url": "https://delivery.demo.raise.access-dpe.com/dummy/title_image_rookie.png",
            "width": 116,
            "height": 23
          },
          "title": "ランキング",
          "link": {
            "text": "すべて見る",
            "action_url": "https://rookie.shonenjump.com?landing_from_app=1"
          },
          "description": "あなたの応援でヒット作を生み出そう！",
        },

        // ルーキーピックアップ
        {
          "type": "rookie_pickup",
          "bgcolor": "#01A2F2",
          "color": "#FFFFFF",
          "title": "ピックアップ作品",
        },

        // 週刊少年ジャンプ
        {
          "type": "subscription",
          "bgcolor": "#000000",
          "color": "#FFFFFF",
          "title": "週刊少年ジャンプ",
          "link": {
            "text": "最新号を詳しく見る",
            "action_url": "jumpplus://magazine-top?subscription_id=sb1"
          },
          "subscription_id": "sb1" // 週刊少年ジャンプ定期購読
        },

        // 本リスト
        {
          "type": "books",
          "title": "ジャンプコミックストア",
          "description": "新刊コミックス好評発売中！",
          "link": {
            "text": "すべて見る",
            "action_url": "jumpplus://comic-store-top"
          },
          "content_ids": [
            "ec1", // リクドウ【23】
            "cc2"  // かぐや様は告らせたい〜天才たちの恋愛頭脳戦〜 15
            // 省略
          ]
        },

        // 検索
        {
          "type": "search",
        },

        // バナー
        {
          "type": "banners",
          "title": "スペシャルコンテンツ",
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
