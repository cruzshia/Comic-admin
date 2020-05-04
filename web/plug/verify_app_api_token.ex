use Croma

defmodule RaiseServer.Plug.VerifyAppApiToken do
  alias Antikythera.Conn

  defun verify(conn :: v[Conn.t], _opts :: any) :: v[Conn.t] do
    # TODO: Verifiy x-raise-api-token.
    # - If the token is nil or invalid format, return RaiseServer.Error.BadRequest.
    # - If the token is expired, return RaiseServer.Error.ObsoleteAPIToken.
    # - If the token is not expired, assigns user infomation to conn by Conn.assign/3.
    conn
  end
end
