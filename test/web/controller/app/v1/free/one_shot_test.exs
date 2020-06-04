defmodule RaiseServer.Controller.App.V1.Free.OneShotTest do
  use RaiseServer.RepoCase

  @path "/api/app/v1/free/one_shot"

  alias RaiseServer.{AppsFactory, DepotFactory}

  setup do
    screen = AppsFactory.insert(:free_one_shot_screen)
    [app: screen.app, header: %{"x-raise-aid" => screen.app.app_id_token}]
  end

  describe "get/1" do
    test "returns free one_shot page content", ctx do
      %{header: header, app: app} = ctx

      sample_works = DepotFactory.insert_list(6, :episode_work, [episode_work_type: :one_shot])
      Enum.each(sample_works, &DepotFactory.insert(:work_app, work: &1, app_id: app.id))

      assert %{status: 200, body: _body} = Req.get(@path <> "?limit=#{3}&offset=#{1}", header)
    end

    test "returns ResourceNotFound when no results found", ctx do
      %{header: header} = ctx
      res = Req.get(@path, header)
      assert_error(res, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
