alias Antikythera.Test.Config
alias Mix.Tasks.RaiseServer.Ecto

Config.init()

if Config.test_mode() == :whitebox do
  white_box_secret = Config.whitebox_test_secret()

  %{
    "api_token_key" => "server_secret_key",
  }
  |> Map.put("db", white_box_secret["db"])
  |> Antikythera.Test.GearConfigHelper.set_config()

  Ecto.Create.execute()
  Ecto.Migrate.execute()
end

defmodule Req do
  use Antikythera.Test.HttpClient
end

defmodule Socket do
  use Antikythera.Test.WebsocketClient
end

[
  "test/support/util/*.exs",
  "test/support/*.exs",
  "test/support/factory/*.exs",
]
|> Enum.flat_map(&Path.wildcard/1)
|> Enum.each(&Code.load_file/1)

{:ok, _} = Application.ensure_all_started(:ex_machina)
