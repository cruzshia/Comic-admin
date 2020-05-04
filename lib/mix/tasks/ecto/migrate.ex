use Croma

defmodule Mix.Tasks.RaiseServer.Ecto.Migrate do
  @moduledoc """
  Usage: `RAISE_SERVER_CONFIG_JSON=$(< gear_config.json) mix raise_server.ecto.migrate`

  Runs the pending migrations.
  """

  use Mix.Task

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  def run([]) do
    Logger.App.stop() # To restart Logger with application's config
    :ok = Antikythera.Mix.Task.prepare_antikythera_instance()
    Logger.App.start()

    execute()

    IO.puts("Done")
  end

  def execute() do
    {:ok, pid} = RaiseServer.Ecto.prepare_repo()

    opts = [all: true, dynamic_repo: pid]
    path = Path.join(File.cwd!(), "priv/repo/migrations")

    Ecto.Migrator.run(Repo, path, :up, opts)
  end
end
