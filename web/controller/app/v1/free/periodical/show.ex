use Croma

defmodule RaiseServer.Controller.App.V1.Free.Periodical.Show do
  use RaiseServer.Controller.Api

  alias RaiseServer.Plug
  alias RaiseServer.SectionBuilder

  plug Plug.FetchAppByAid, :fetch, []
  plug Plug.VerifyAppApiToken, :verify, []

  defun show(%Conn{assigns: %{app: %{id: app_id}}} = conn) :: v[Conn.t] do
    now = DateTime.utc_now()
    case SectionBuilder.generate(app_id, now, :free_periodical) do
      free_periodical = %{} ->
        Conn.json(conn, 200, free_periodical)
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
