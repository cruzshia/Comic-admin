use Croma

defmodule RaiseServer.Controller.Api do
  alias Antikythera.Conn
  alias RaiseServer.Helper.ErrorJson

  defmacro __using__(_) do
    quote do
      use Antikythera.Controller

      alias Antikythera.Request

      plug RaiseServer.Plug.PrepareRepo, :prepare, []
    end
  end

  defun validate_params(conn :: v[Conn.t], v :: any, validator :: module | fun, f :: (any -> any)) :: any do
    case validate_impl(validator, v) do
      {:ok, validated} -> f.(validated)
      {:error, _}      -> ErrorJson.json_by_error(conn, RaiseServer.Error.BadRequest.new())
    end
  end

  defp validate_impl(validator, v) when is_function(validator) do
    validator.(v)
  end
  defp validate_impl(validator, v) when is_atom(validator) do
    validator.new(v)
  end
end
