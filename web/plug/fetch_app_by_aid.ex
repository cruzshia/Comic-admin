use Croma

defmodule RaiseServer.Plug.FetchAppByAid do
  alias Antikythera.Conn
  alias RaiseServer.Error.BadRequest
  alias RaiseServer.Helper.ErrorJson
  alias RaiseServer.Apps

  defun fetch(conn :: v[Conn.t], _opts :: any \\ []) :: v[Conn.t] do
    case Conn.get_req_header(conn, "x-raise-aid") do
      nil ->
        ErrorJson.json_by_error(conn, BadRequest.new())
      aid ->
        find_and_assign_app(conn, aid)
    end
  end

  defunp find_and_assign_app(conn :: v[Conn.t], app_id_token :: v[String.t]) :: v[Conn.t] do
    # TODO: use A9a Memcache with/without redis.
    case Apps.get_app(app_id_token) do
      nil ->
        ErrorJson.json_by_error(conn, BadRequest.new())
      app ->
        Conn.assign(conn, :app, app)
    end
  end
end
