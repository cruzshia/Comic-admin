defmodule RaiseServer.FreePeriodicalData do

  def app_screen_setting_json_str(recommended_work_id) do
    """
    {
      "monday": {
          "recommended_work_id": "ew#{recommended_work_id}" // SPY×FAMILY
      },
      "tuesday": {
          // 推し作品がない場合はコメントアウトなどしておく
          // "recommended_work_id": "ew2" // 姫様“拷問”の時間です
      },
      "wednesday": {
          "recommended_work_id": "ew3" // 道産子ギャルはなまらめんこい
      },
      "thursday": {
          "recommended_work_id": "ew4" // アビスレイジ
      },
      "friday": {
          "recommended_work_id": "ew5" // 恋獄の都市
      },
      "saturday": {
          "recommended_work_id": "ew6" // 2.5次元の誘惑
      },
      "sunday": {
          "recommended_work_id": "ew7" // スライムライフ
      },
      "other": {
          "recommended_work_id": "ew8" // 青のフラッグ
      }
    }
    """
  end
end
