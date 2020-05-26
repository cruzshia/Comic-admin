use Croma

defmodule RaiseServer.Controller.App.V1.FirstLaunch.Create do
  use RaiseServer.Controller.Api

  alias Croma.Result
  alias RaiseServer.Plug
  alias RaiseServer.Account
  alias RaiseServer.Account.Device
  alias RaiseServer.Crypto

  plug Plug.FetchAppByAid, :fetch, []

  defun create(%Conn{request: %{body: body}} = conn) :: v[Conn.t] do
    now = DateTime.utc_now()
    case get_device(body["v2_device_id_token"]) do
      {:ok, device} ->
        Conn.json(conn, 200, %{api_token: create_api_token(device, now)})
      {:error, error} ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, error)
    end
  end

  defunp get_device(v2_device_id_token) :: Result.t(Device.t) do
    (nil) ->
      %{devices: [device | _]} = Account.create_user()
      {:ok, device}
    (v2_device_id_token) when is_binary(v2_device_id_token) ->
      case Account.get_device_by_v2_device_id_token(v2_device_id_token) do
        nil -> {:error, RaiseServer.Error.ResourceNotFound.new()}
        device -> {:ok, device}
      end
    (_) ->
      {:error, RaiseServer.Error.BadRequest.new()}
  end

  defunp create_api_token(%{id: device_id, user_id: user_id} = _device :: Device.t, now :: DateTime.t) :: String.t do
    api_token_key = RaiseServer.get_env("api_token_key")
    Jason.encode!(%{type: "api", device_id: device_id, user_id: user_id, created_at: now})
    |> Crypto.aes256_encrypt(api_token_key)
    |> Base.url_encode64(padding: false)
  end
end
