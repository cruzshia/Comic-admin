defmodule RaiseServer.AppsFactory do
  use RaiseServer.Factory

  alias RaiseServer.Apps.{App, AppScreenSetting}
  alias RaiseServer.HomeData

  def app_factory() do
    %App{
      app_id_token: sequence(:token, &"sometoken#{&1}"),
      name: "SomeApp",
      common_key: "somekey"
    }
  end

  def app_screen_setting_factory() do
    {utc_now, _} = publish_range()

    %AppScreenSetting{
      app: build(:app),
      publish_begin_at: utc_now,
      note: "somenote",
      screen: RaiseServer.ScreenEnum.__enum_map__() |> Keyword.keys() |> Enum.random()
    }
  end

  def home_screen_factory() do
    app_screen_setting_factory()
    |> struct!(%{screen: :home, setting: HomeData.app_screen_setting_json_str()})
  end

  def free_one_shot_screen_factory() do
    app_screen_setting_factory()
    |> struct!(%{screen: :free_one_shot, setting: "{'recommended_work_id': 'ew1000'}"})
  end

  def insert_raw(schema_name, attrs \\ %{}) do
    schema_function = "#{schema_name}_factory" |> String.to_existing_atom

    apply(__MODULE__, schema_function, [])
    |> struct!(attrs)
    |> Repo.insert!
  end
end
