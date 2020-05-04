use Croma

defmodule RaiseServer.Ecto do
  alias Croma.Result, as: R
  require AntikytheraAcs.Ecto
  alias AntikytheraAcs.Ecto.PostgresRepo

  @epool_id {:gear, :raise_server}

  defun prepare_repo() :: v[R.t(pid)] do
    %{
      "hostname" => hostname,
      "database" => database,
      "username" => username,
      "password" => password,
      "ssl"      => ssl,
    } = RaiseServer.get_env("db")
    options = [username: username, password: password, ssl: ssl]
    AntikytheraAcs.Ecto.put_or_start_repo(@epool_id, hostname, database, PostgresRepo, options)
  end

  defun repo_config() :: Keyword.t do
    %{
      "hostname" => hostname,
      "database" => database,
      "username" => username,
      "password" => password,
      "ssl"      => ssl,
    } = RaiseServer.get_env("db")
    [
      hostname: hostname,
      database: database,
      username: username,
      password: password,
      ssl:      ssl,
    ]
  end
end
