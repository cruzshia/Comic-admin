use Croma

defmodule RaiseServer.Controller.App.V1.Home.Show do
  use RaiseServer.Controller.Api

  alias RaiseServer.AppScreenSetting
  alias RaiseServer.Plug

  plug Plug.FetchAppByAid, :fetch, []

  defun show(%Conn{assigns: %{app: %{id: app_id}}} = conn) :: v[Conn.t] do
    now = DateTime.utc_now()
    case AppScreenSetting.get_and_build_sections(:home, app_id, now) do
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
      sections ->
        Conn.json(conn, 200, %{sections: sections})
    end
  end
end
