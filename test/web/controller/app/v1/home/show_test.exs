defmodule RaiseServer.Controller.App.V1.Home.ShowTest do
  use RaiseServer.RepoCase

  alias RaiseServer.AppFactory
  alias RaiseServer.AppScreenSettingFactory

  @path   "/api/app/v1/home"
  @header %{
    "x-raise-aid" => @dummy_aid,
  }

  describe "show/1" do
    setup do
      AppFactory.insert(:app)
      :ok
    end

    test "returns sections" do
      AppScreenSettingFactory.insert(:app_screen_setting)

      res = Req.get(@path, @header)
      assert res.status == 200
      assert Jason.decode!(res.body) == %{"sections" => []} # TODO: Verify right sections
    end

    test "returns ResourceNotFound if the screen setting is nothing" do
      res = Req.get(@path, @header)
      assert_error(res, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
