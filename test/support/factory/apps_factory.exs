defmodule RaiseServer.AppsFactory do
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  alias RaiseServer.Apps.{App, AppScreenSetting}
  alias RaiseServer.HomeData

  def app_factory() do
    %App{
      app_id_token: "sometoken",
      name: "SomeApp",
      common_key: "somekey"
    }
  end

  def app_screen_setting_factory() do
    utc_now = DateTime.utc_now |> DateTime.truncate(:second)
    %AppScreenSetting{
      publish_begin_at: utc_now ,
      note: "somenote"
    }
  end

  def home_screen_factory() do
    app_screen_setting_factory()
    |> struct!(%{screen: :home, setting: HomeData.app_screen_setting_json_str()})
  end

  def insert(schema_name, attrs \\ %{}) do
    schema_function = "#{schema_name}_factory" |> String.to_existing_atom

    apply(__MODULE__, schema_function, [])
    |> struct!(attrs)
    |> Repo.insert!
  end
end
