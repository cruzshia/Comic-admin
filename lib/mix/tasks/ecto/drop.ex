use Croma

defmodule Mix.Tasks.RaiseServer.Ecto.Drop do
  @moduledoc """
  Usage: `RAISE_SERVER_CONFIG_JSON=$(< gear_config.json) mix raise_server.ecto.drop`

  Drops DB.
  """

  use Mix.Task

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  def run([]) do
    :ok = Antikythera.Mix.Task.prepare_antikythera_instance()

    case execute() do
      :ok ->
        Mix.shell().info "The database for #{inspect Repo} has been dropped"
      {:error, :already_down} ->
        Mix.shell().info "The database for #{inspect Repo} has already been dropped"
    end
  end

  def execute() do
    config = RaiseServer.Ecto.repo_config()
    Repo.__adapter__().storage_down(config)
  end
end
