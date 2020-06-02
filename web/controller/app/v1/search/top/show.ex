use Croma

defmodule RaiseServer.Controller.App.V1.Search.Top.Show do
  use RaiseServer.Controller.Api

  alias RaiseServer.SectionBuilder
  alias RaiseServer.Plug

  plug Plug.FetchAppByAid, :fetch, []

  defun show(%Conn{assigns: %{app: %{id: app_id}}} = conn) :: Conn.t do
    now = DateTime.utc_now()
    case SectionBuilder.generate(app_id, now, :search_top) do
      sections = %{} ->
        Conn.json(conn, 200, sections)
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
