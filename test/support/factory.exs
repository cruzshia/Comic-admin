defmodule RaiseServer.Factory do
  defmacro __using__(_) do
    quote do
      use ExMachina.Ecto, repo: AntikytheraAcs.Ecto.PostgresRepo

      alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

      defp publish_range() do
        utc_now = DateTime.utc_now() |> DateTime.truncate(:second)
        {DateTime.add(utc_now, -3600 * 24 * Enum.random(1..7), :second), DateTime.add(utc_now, 3600 * 24 * Enum.random(1..7), :second)}
      end
    end
  end
end
