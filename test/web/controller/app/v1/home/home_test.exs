# TODO Fix this test
defmodule RaiseServer.Controller.App.V1.HomeTest do
  use RaiseServer.RepoCase

  alias RaiseServer.AppsFactory

  @path "/api/app/v1/home"

  describe "get/1" do
    setup do
      app = AppsFactory.insert(:app)
      [app: app, header: %{ "x-raise-aid" => app.app_id_token}]
    end

    # test "returns home sections", %{app: app, header: header} do
    #   HomeData.create_resources(app)

    #   %{"sections" => _orig_sections} =
    #     HomeData.app_screen_setting_json_str()
    #     |> :jsx.decode(return_maps: true)

    #   assert %{status: 200, body: body} = Req.get(@path, header)
    #   assert %{"sections" => _sections} = Jason.decode!(body)
    #   #Enum.scan(sections, orig_sections, &validate_section/2)
    # end

    test "returns ResourceNotFound if the screen setting is nothing", %{header: header} do
      res = Req.get(@path, header)
      assert_error(res, RaiseServer.Error.ResourceNotFound.new())
    end
  end

  #defp validate_section(res_section, [expect_section | tail]) do
    #assert res_section == expect_section
    #tail
  #end
end
