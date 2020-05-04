use Croma

defmodule RaiseServer.Plug.FetchAppByAid do
  alias Antikythera.Conn
  alias RaiseServer.Error.BadRequest
  alias RaiseServer.Helper.ErrorJson
  alias RaiseServer.App

  defun fetch(conn :: v[Conn.t], _opts :: any) :: v[Conn.t] do
    case Conn.get_req_header(conn, "x-raise-aid") do
      nil ->
        ErrorJson.json_by_error(conn, BadRequest.new())
      aid ->
        find_and_assign_app(conn, aid)
    end
  end

  defunp find_and_assign_app(conn :: v[Conn.t], _aid :: v[String.t]) :: v[Conn.t] do
    # TODO: Fix to fetch app based on "aid" and use A9a Memcache with/without redis.
    case App.get_by_id(0) do
      nil ->
        ErrorJson.json_by_error(conn, BadRequest.new())
      app ->
        Conn.assign(conn, :app, app)
    end
  end
end
