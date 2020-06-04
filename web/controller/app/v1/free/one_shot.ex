use Croma

defmodule RaiseServer.Controller.App.V1.Free.OneShot do
  use RaiseServer.Controller.Api

  alias RaiseServer.SectionBuilder
  alias RaiseServer.Plug

  plug Plug.FetchAppByAid, :fetch, []

  defun get(%Conn{assigns: %{app: %{id: app_id}}, request: %{query_params: params}} = conn) :: Conn.t do
    options = Enum.map(params, fn
      {"limit", value} -> {:limit, String.to_integer(value)}
      {"offset", value} -> {:offset, String.to_integer(value)}
      opt -> opt
    end)

    case SectionBuilder.generate(app_id, DateTime.utc_now, :free_one_shot, options) do
      result when not is_nil(result) ->
        Conn.json(conn, 200, result)
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
