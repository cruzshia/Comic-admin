use Croma

defmodule RaiseServer.Controller.App.V1.Free.OnlyNow.Show do
  use RaiseServer.Controller.Api

  alias RaiseServer.SectionBuilder
  alias RaiseServer.Plug

  plug Plug.FetchAppByAid, :fetch, []

  defun show(%Conn{assigns: %{app: %{id: app_id}}} = conn) :: v[Conn.t] do
    now = DateTime.utc_now()
    case SectionBuilder.generate(app_id, now, :free_only_now) do
      sections = %{} ->
        Conn.json(conn, 200, sections)
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
