defmodule RaiseServer.OnlyNowData do
  alias RaiseServer.{AppsFactory, DepotFactory}

  def create_resources(app) do
    work = DepotFactory.insert(:work)
    content = DepotFactory.insert(:content, %{work_id: work.id})

    AppsFactory.insert(
      :app_screen_setting,
      %{app_id: app.id, screen: :free_only_now, setting: app_screen_setting_json_str(work.id, content.id)}
    )
    DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app.id})
    DepotFactory.insert(:content_app, %{content_id: content.id, app_id: app.id})

    fon_campaign = DepotFactory.insert(:campaign)
    fon_work = DepotFactory.insert(:work)
    fon_content = DepotFactory.insert(:content, %{work_id: fon_work.id})
    DepotFactory.insert(:content_app, %{content_id: fon_content.id, app_id: app.id})
    fon_work_campaign = DepotFactory.insert(:work_campaign, %{work_id: fon_work.id, campaign_id: fon_campaign.id, free_range: "1-1"})
    DepotFactory.insert(:work_app, %{work_id: fon_work.id, app_id: app.id})
    DepotFactory.insert(:work_campaign_app, %{work_campaign_id: fon_work_campaign.id, app_id: app.id})
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
