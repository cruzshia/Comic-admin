defmodule RaiseServer.Migrations.AddAppScreenSettingsTable do
  use Ecto.Migration

  def up do
    create table(:app_screen_settings) do
      add :app_id,           references("apps", type: :serial), null: false
      add :screen,           :integer,                          null: false
      add :publish_begin_at, :utc_datetime,                     null: false
      add :publish_end_at,   :utc_datetime,                     null: false
      add :setting,          :text,                             null: false
      add :note,             :string,                           size: 1000, null: false

      timestamps()
    end

    create unique_index(
      :app_screen_settings,
      [:app_id, :screen, :publish_begin_at, :publish_end_at],
      name: :app_screen_settings_app_id_screen_publish_period_index
    )
  end

  def down do
    drop table(:app_screen_settings)
  end
end
