defmodule RaiseServer.Plug.FetchAppByAidTest do
  use RaiseServer.RepoCase

  alias Antikythera.Test.ConnHelper
  alias RaiseServer.AppFactory
  alias RaiseServer.Helper.ErrorJson
  alias RaiseServer.Error.BadRequest
  alias RaiseServer.Plug.FetchAppByAid

  @header %{
    "x-raise-aid" => "dummy_aid",
  }
  @app    AppFactory.app_factory()

  setup do
    AppFactory.insert(:app)
    :ok
  end

  describe "fetch/1" do
    test "assigns app if x-raise-aid header matches the app" do
      conn = ConnHelper.make_conn(headers: @header)
      conn2 = FetchAppByAid.fetch(conn, [])

      assert schema_to_map(conn2.assigns[:app]) == schema_to_map(@app)
    end

    test "returns BadRequest if x-raise-aid header is nothing" do
      conn = ConnHelper.make_conn()
      assert FetchAppByAid.fetch(conn, []) == ErrorJson.json_by_error(conn, BadRequest.new())
    end
  end
end
