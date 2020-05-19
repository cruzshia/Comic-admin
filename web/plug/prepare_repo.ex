use Croma

defmodule RaiseServer.Plug.PrepareRepo do
  alias Antikythera.Conn

  defun prepare(conn :: v[Conn.t], _opts :: any) :: v[Conn.t] do
    {:ok, _} = RaiseServer.Ecto.prepare_repo()
    conn
  end
end
