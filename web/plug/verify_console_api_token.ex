use Croma

defmodule RaiseServer.Plug.VerifyConsoleApiToken do
  alias Antikythera.Conn
  alias RaiseServer.Helper.ErrorJson

  defun verify(conn :: v[Conn.t], _opts :: any) :: v[Conn.t] do
    case Conn.get_req_header(conn, "x-raise-api-token") do
      nil ->
        ErrorJson.json_by_error(conn, RaiseServer.Error.BadRequest.new())
      _ ->
        conn
    end
    # TODO: Verifiy x-raise-api-token.(RA-4524 https://r-project.atlassian.net/browse/RA-4524)
    # - If the token is nil or invalid format, return RaiseServer.Error.BadRequest.
    # - If the token is expired, return RaiseServer.Error.ObsoleteAPIToken.
    # - If the token is not expired, assigns user infomation to conn by Conn.assign/3.
  end
end
