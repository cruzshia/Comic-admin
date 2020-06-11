use Croma

defmodule RaiseServer.Controller.Console.V1.Query do
  alias Croma.Result

  defun to_integer(s :: v[String.t]) :: integer | :error do
    case Integer.parse(s) do
      {n, ""} ->
        n
      _ ->
        :error
    end
  end

  # TODO: Use correct validation and default values for limit and offset. RA-4554(https://r-project.atlassian.net/browse/RA-4554)
  defmodule Limit do
    use Croma.SubtypeOfInt, min: 1, max: 100, default: 100
    def new(s) when is_binary(s), do: RaiseServer.Controller.Console.V1.Query.to_integer(s) |> Result.wrap_if_valid(__MODULE__)
    def new(i), do: Result.wrap_if_valid(i, __MODULE__)
  end

  defmodule Offset do
    use Croma.SubtypeOfInt, min: 0, default: 0
    def new(s) when is_binary(s), do: RaiseServer.Controller.Console.V1.Query.to_integer(s) |> Result.wrap_if_valid(__MODULE__)
    def new(i), do: Result.wrap_if_valid(i, __MODULE__)
  end

  defmodule CromaDateTime do
    @type t :: DateTime.t

    def valid?(%DateTime{}), do: true
    def valid?(_),           do: false

    def new(%DateTime{} = dt), do: {:ok, dt}
    def new(s) when is_binary(s) do
      case DateTime.from_iso8601(s) do
        {:ok, dt, _} -> {:ok, dt}
        _            -> {:error, {:invalid_value, [__MODULE__]}}
      end
    end
    def new(_), do: {:error, {:invalid_value, [__MODULE__]}}
  end
end
