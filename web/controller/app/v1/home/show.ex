use Croma

defmodule RaiseServer.Controller.App.V1.Home.Show do
  use RaiseServer.Controller.Api

  alias RaiseServer.SectionBuilder
  alias RaiseServer.Plug

  plug Plug.FetchAppByAid, :fetch, []

  defun show(%Conn{assigns: %{app: %{id: app_id}}} = conn) :: v[Conn.t] do
    now = DateTime.utc_now()
    case SectionBuilder.generate(app_id, now, :home) do
      sections = %{} ->
        %Conn{conn |
          status:       200,
          resp_headers: %{"content-type" => "application/json"},
          resp_body:    Jason.encode!(sections),
        }
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
