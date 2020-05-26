defmodule RaiseServer.AppsTest do
  use RaiseServer.RepoCase

  alias RaiseServer.Apps
  alias RaiseServer.AppsFactory

  describe "get_app/1" do
    test "can fetch an app record by app_id_token" do
      %{id: orig_id, name: orig_name, common_key: orig_key, app_id_token: app_id_token} = AppsFactory.insert(:app)
      assert %{id: ^orig_id, name: ^orig_name, common_key: ^orig_key} = Apps.get_app(app_id_token)
    end
  end

  describe "get_page_setting/3" do
    test "returns settings for a page" do
      json_str = %{ "sections" => [%{
        "banners" => [
          %{
            "action_url" => "jumpplus://works/ew1",
            "height" => 235,
            "url" => "https://webview.shonenjump.com/fmc/200413/waku2/w2-1.jpg?timestamp=200413",
            "width" => 750
          }
        ],
        "slice_tablet" => 2,
        "title" => "スペシャルコンテンツ",
        "type" => "banners"
      }] }
      |> :jsx.encode

      app = AppsFactory.insert(:app)
      # TODO update screen integer to screen enum
      AppsFactory.insert(:app_screen_setting, %{app_id: app.id, screen: 0, setting: "//fakecomment \n" <> json_str})

      assert %{ "sections" => [ %{ "type" => "banners"} ]} = Apps.get_page_setting(app.id, :home)
    end
  end
end
