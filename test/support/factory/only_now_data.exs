defmodule RaiseServer.OnlyNowData do
  alias RaiseServer.{AppsFactory, DepotFactory}

  def create_resources(app) do
    work = DepotFactory.insert(:work, %{episode_work_type: 4})
    content = DepotFactory.insert(:content, %{work: work})
    DepotFactory.insert(:content_assessment, %{content: content})

    DepotFactory.insert(:work_app, %{work: work, app: app})
    DepotFactory.insert(:content_app, %{content: content, app: app})

    limited_time_free_campaign = DepotFactory.insert(:campaign)
    limited_time_free_work = DepotFactory.insert(:work)
    limited_time_free_content = DepotFactory.insert(:content, %{work: limited_time_free_work})
    DepotFactory.insert(:content_app, %{content: limited_time_free_content, app: app})
    limited_time_free_work_campaign = DepotFactory.insert(:work_campaign, %{work: limited_time_free_work, campaign: limited_time_free_campaign, free_range: "1-1"})
    DepotFactory.insert(:work_app, %{work: limited_time_free_work, app: app})
    DepotFactory.insert(:work_campaign_app, %{work_campaign: limited_time_free_work_campaign, app: app})
    AppsFactory.insert(
      :app_screen_setting,
      %{app: app, screen: :free_only_now, setting: app_screen_setting_json_str(limited_time_free_work.id, content.id)}
    )
    app
  end

  def app_screen_setting_json_str(work_id, content_id) do
    """
    {
      "sections": [
          {
              "type": "limited_time_free",
              "title": "今日の無料話追加"
          },
          {
              "type": "read_in_one_go",
              "title": "名作をまとめてイッキ読み",
              "recommended_work_id": "cw#{work_id}" // PSYREN -サイレン-
          },
          {
              "type": "limited_time_free_comic",
              "title": "【0円】毎週火曜のお楽しみ。ジャンプ+",
              "content_ids": [
                "cc#{content_id}" // PSYREN -サイレン-
                  // 省略
              ]
          },
          {
              "type": "limited_time_free_comic",
              "title": "ジャンプSQ.無料大開放キャンペーン",
              "content_ids": [
                  "cc11", // ワールドトリガー 1
                  "cc12"  // るろうに剣心―明治剣客浪漫譚・北海道編― 1
                  // 省略
              ]
          },
          {
              "type": "limited_time_free_comic",
              "title": "【毎月19日はYJC新刊発売日】3月新刊キャンペーン",
              "content_ids": [
                  "cc21", // ゴールデンカムイ 1
                  "cc22"  // メイド・イン・ひっこみゅ～ず 1
                  // 省略
              ]
          }
      ]
    }
    """
  end
end
