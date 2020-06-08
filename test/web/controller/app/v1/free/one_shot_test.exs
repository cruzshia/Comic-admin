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

    test "returns BadRequest when limit/offset is not valid", ctx do
      %{header: header} = ctx
      res1 = Req.get(@path <> "?limit=0", header)
      assert_error(res1, RaiseServer.Error.BadRequest.new())

      res2 = Req.get(@path <> "?offset=-1", header)
      assert_error(res2, RaiseServer.Error.BadRequest.new())

      res3 = Req.get(@path <> "?limit=101", header)
      assert_error(res3, RaiseServer.Error.BadRequest.new())

      res4 = Req.get(@path <> "?limit=a", header)
      assert_error(res4, RaiseServer.Error.BadRequest.new())

      res5 = Req.get(@path <> "?offset=a", header)
      assert_error(res5, RaiseServer.Error.BadRequest.new())
    end
  end
end
