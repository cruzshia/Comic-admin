# TODO Fix this test
defmodule RaiseServer.Controller.App.V1.Free.OnlyNow.ShowTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, OnlyNowData}

  @path "/api/app/v1/free/only_now"

  describe "show/1" do
    setup do
      app = AppsFactory.insert(:app)
      [app: app, header: %{"x-raise-aid" => app.app_id_token}]
    end

    test "returns only_now sections", %{app: app, header: header} do
      OnlyNowData.create_resources(app)

      assert %{status: 200, body: body} = Req.get(@path, header)
      assert %{"sections" => sections} = Jason.decode!(body)
    end

    test "returns ResourceNotFound if the screen setting is nothing", %{header: header} do
      res = Req.get(@path, header)
      assert_error(res, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
