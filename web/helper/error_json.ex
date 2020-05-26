use Croma

defmodule RaiseServer.Helper.ErrorJson do
  use Antikythera.Controller

  defun json_by_error(conn :: v[Conn.t], %{status: status, type: type, message: message}) :: Conn.t do
    Conn.json(conn, status, %{
      type:    type,
      message: message,
    })
  end
end
