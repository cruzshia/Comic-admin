defmodule RaiseServer.Controller.App.V1.Search.TopTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory, ScreenSettingUtils}

  @path "/api/app/v1/search/top"

  describe "get/1" do
    setup do
      app = AppsFactory.insert(:app)
      [app: app, header: %{ "x-raise-aid" => app.app_id_token}]
    end

    test "returns show top sections", %{app: app, header: header} do
      %{setting: setting_str} = AppsFactory.insert(:home_screen, %{app: app})
      setting = :jsx.decode(setting_str, return_maps: true)
      top_banners_setting = ScreenSettingUtils.find_section(setting, "top_banners")
      free_only_now_setting = ScreenSettingUtils.find_section(setting, "free_only_now")

      fon_campaign = DepotFactory.insert(:campaign)
      fon_work = DepotFactory.insert(:work)
      fon_work_campaign = DepotFactory.insert(:work_campaign, %{work_id: fon_work.id, campaign_id: fon_campaign.id})
      DepotFactory.insert(:work_app, %{work_id: fon_work.id, app_id: app.id})
      DepotFactory.insert(:work_campaign_app, %{work_campaign_id: fon_work_campaign.id, app_id: app.id})

      assert %{status: 200, body: body} = Req.get(@path, header)
      assert %{"sections" => sections} = Jason.decode!(body)

      free_only_now = Enum.find(sections, &(Map.get(&1, "type") == "free_only_now"))
      free_only_now_works = free_only_now["works"]
      action_url = "jumpplus://works/ew#{fon_work.id}"

      assert Enum.find(sections, &(Map.get(&1, "type") == "top_banners")) == top_banners_setting
      assert ^free_only_now_setting = Map.delete(free_only_now, "works")
      assert [
        %{
          "action_url" => ^action_url,
          "title" => _,
          "end_date" => _,
          "free_range_display_string" => _,
          "image" => %{
            "url" => _,
            "height" => _,
            "width" => _,
          },
        }
      ] = free_only_now_works
    end

    test "returns ResourceNotFound if the screen setting is nothing", %{header: header} do
      res = Req.get(@path, header)
      assert_error(res, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
