defmodule RaiseServer.Plug.FetchAppByAidTest do
  use RaiseServer.RepoCase

  alias Antikythera.Test.ConnHelper
  alias RaiseServer.Helper.ErrorJson
  alias RaiseServer.Error.BadRequest
  alias RaiseServer.Plug.FetchAppByAid

  alias RaiseServer.AppsFactory

  describe "fetch/1" do
    setup do
      app = AppsFactory.insert(:app)
      %{
        header: %{"x-raise-aid" => app.app_id_token},
        app: app
      }
    end

    test "assigns app if x-raise-aid header matches the app", ctx do
      %{header: header, app: app} = ctx

      conn =
        ConnHelper.make_conn(headers: header)
        |> FetchAppByAid.fetch()

      assert schema_to_map(conn.assigns[:app]) == schema_to_map(app)
    end

    test "returns BadRequest if x-raise-aid header is nothing" do
      conn = ConnHelper.make_conn()
      assert FetchAppByAid.fetch(conn, []) == ErrorJson.json_by_error(conn, BadRequest.new())
    end
  end
end
