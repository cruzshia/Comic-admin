defmodule RaiseServer.AppScreenSettingFactory do
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.Apps.AppScreenSetting

  def app_screen_setting_factory() do
    %AppScreenSetting{
      id:               0,
      app_id:           0,
      screen:           0, # TODO: Use ecto_enum(home: 0)
      publish_begin_at: ~U[2000-01-01 00:00:00Z],
      setting:          "{\"sections\": []}", # TODO: Fix to real data
      note:             "dummy_note",
      inserted_at:      ~U[2020-01-01 00:00:00Z],
      updated_at:       ~U[2020-01-01 00:00:00Z],
    }
  end

  # TODO: Use ex_machina
  def insert(:app_screen_setting, attrs \\ %{}) do
    merged = struct!(app_screen_setting_factory(), attrs)
    Repo.insert!(merged)
  end
end
