use Croma

defmodule RaiseServer.Plug.VerifyAppApiTokenTest do
  use RaiseServer.RepoCase

  alias Antikythera.Test.ConnHelper
  alias RaiseServer.Helper.ErrorJson
  alias RaiseServer.Error.{BadRequest, ObsoleteAPIToken}
  alias RaiseServer.Plug.VerifyAppApiToken

  alias RaiseServer.{Utils, AccountFactory}

  describe "verify/1" do
    test "assigns user_id if x-raise-api-token header matches the token" do
      %{id: user_id} = AccountFactory.insert(:user)
      device = AccountFactory.insert(:device, %{user_id: user_id})
      now = DateTime.utc_now()
      api_token = Utils.create_api_token(device, now)

      headers = %{"x-raise-api-token" => api_token}

      conn =
        ConnHelper.make_conn(headers: headers)
        |> VerifyAppApiToken.verify([])

      assert %{assigns: %{user_id: ^user_id}} = conn
    end

    test "returns BadRequest if x-raise-api-token header is nothing" do
      conn = ConnHelper.make_conn()
      assert VerifyAppApiToken.verify(conn, []) == ErrorJson.json_by_error(conn, BadRequest.new())
    end

    test "returns BadRequest if x-raise-api-token header can't find the device" do
      device =
        AccountFactory.device_factory()
       |> Map.put(:id, 0)

      now = DateTime.utc_now()
      api_token = Utils.create_api_token(device, now)
      headers = %{"x-raise-api-token" => api_token}

      conn =
        ConnHelper.make_conn(headers: headers)
        |> VerifyAppApiToken.verify([])

      assert VerifyAppApiToken.verify(conn, []) == ErrorJson.json_by_error(conn, BadRequest.new())
    end

    test "returns ObsoleteAPIToken if x-raise-api-token header don't match the user_id" do
      %{id: user_id} = AccountFactory.insert(:user)
      device =
        AccountFactory.insert(:device, %{user_id: user_id})
        |> Map.put(:user_id, 0)

      now = DateTime.utc_now()
      api_token = Utils.create_api_token(device, now)
      headers = %{"x-raise-api-token" => api_token}

      conn =
        ConnHelper.make_conn(headers: headers)
        |> VerifyAppApiToken.verify([])

      assert VerifyAppApiToken.verify(conn, []) == ErrorJson.json_by_error(conn, ObsoleteAPIToken.new())
    end
  end
end
