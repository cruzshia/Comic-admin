use Croma

defmodule RaiseServer.Controller.App.V1.Home do
  use RaiseServer.Controller.Api

  alias RaiseServer.SectionBuilder
  alias RaiseServer.Plug

  plug Plug.FetchAppByAid, :fetch, []

  defun get(%Conn{assigns: %{app: %{id: app_id}}} = conn) :: Conn.t do
    case SectionBuilder.generate(app_id, DateTime.utc_now(), :home) do
      sections = %{} ->
        Conn.json(conn, 200, sections)
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
