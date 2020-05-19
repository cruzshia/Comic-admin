defmodule RaiseServer.Migrations.UpdateAppScreenSettings do
  use Ecto.Migration

  def change do
    drop unique_index(:app_screen_settings, [], name: "app_screen_settings_app_id_screen_publish_period_index")

    alter table(:app_screen_settings) do
      remove :publish_end_at, :utc_datetime, null: false
    end

    create unique_index(:app_screen_settings, [:app_id, :screen, :publish_begin_at])
  end
end
