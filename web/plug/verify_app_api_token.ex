use Croma

defmodule RaiseServer.Plug.VerifyAppApiToken do
  alias Antikythera.Conn
  alias RaiseServer.Error.{BadRequest, ObsoleteAPIToken}
  alias RaiseServer.Helper.ErrorJson
  alias RaiseServer.{Utils, Account}

  defun verify(conn :: v[Conn.t], _opts :: any) :: v[Conn.t] do
    api_token = decrypt_api_token(Conn.get_req_header(conn, "x-raise-api-token"))
    case do_verify(api_token) do
      {:ok, user_id} ->
        Conn.assign(conn, :user_id, user_id)
      {:error, error} ->
        ErrorJson.json_by_error(conn, error)
    end
  end

  defp do_verify(nil), do: {:error, BadRequest.new()}

  defp do_verify(%{"type" => "api", "user_id" => user_id, "device_id" => device_id}) do
    case Account.get_device([id: device_id], []) do
      nil ->
        do_verify(nil)
      %{user_id: ^user_id} ->
        {:ok, user_id}
      %{user_id: _} ->
        {:error, ObsoleteAPIToken.new()}
    end
  end

  defp decrypt_api_token(nil), do: nil

  defp decrypt_api_token(api_token) do
    try do
      Utils.decrypt_api_token(api_token)
    catch
      _, _ ->
        nil
    end
  end
end
