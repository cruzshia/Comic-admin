Antikythera.Test.Config.init()

white_box_secret = Antikythera.Test.Config.whitebox_test_secret()

%{
}
|> Map.put("db", white_box_secret["db"])
|> Antikythera.Test.GearConfigHelper.set_config()

defmodule Req do
  use Antikythera.Test.HttpClient
end

defmodule Socket do
  use Antikythera.Test.WebsocketClient
end

Mix.Tasks.RaiseServer.Ecto.Create.execute()
Mix.Tasks.RaiseServer.Ecto.Migrate.execute()

[
  "test/support/*.exs",
  "test/support/factory/*.exs",
]
|> Enum.each(fn path ->
  path
  |> Path.wildcard()
  |> Enum.sort()
  |> Enum.each(&Code.load_file/1)
end)
