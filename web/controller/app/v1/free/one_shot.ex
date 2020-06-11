use Croma

defmodule RaiseServer.Controller.App.V1.Free.OneShot do
  use RaiseServer.Controller.Api

  alias RaiseServer.Controller.Api
  alias RaiseServer.SectionBuilder
  alias RaiseServer.Plug

  plug Plug.FetchAppByAid, :fetch, []

  defun get(%Conn{assigns: %{app: %{id: app_id}}, request: %{query_params: params}} = conn) :: Conn.t do
    Api.validate_params(conn, params, &validate_and_convert_params/1, &generate(&1, app_id, &2))
  end

  defp generate(conn, app_id, options) do
    case SectionBuilder.generate(app_id, DateTime.utc_now(), :free_one_shot, options) do
      nil ->
        RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
      result ->
        Conn.json(conn, 200, result)
    end
  end

  defp validate_and_convert_params(params) do
    limit =
      Map.get(params, "limit", 100)
      |> to_integer()
    offset =
      Map.get(params, "offset", 0)
      |> to_integer()

    case {limit, offset} do
      {limit, offset} when is_integer(limit) and is_integer(offset) and limit >= 1 and limit <= 100 and offset >= 0 ->
        {:ok, [limit: limit, offset: offset]}
      _ ->
        {:error, :error}
    end
  end

  defp to_integer(value) when is_integer(value), do: value

  defp to_integer(value) do
    try do
      String.to_integer(value)
    catch
      _, _ ->
        nil
    end
  end
end
