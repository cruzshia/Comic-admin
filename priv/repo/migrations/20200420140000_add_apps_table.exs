defmodule RaiseServer.Migrations.AddAppsTable do
  use Ecto.Migration

  def up do
    create table(:apps) do
      add :app_id_token,         :string, null: false
      add :name,                 :string, null: false
      add :common_key,           :bytea,  null: false
      add :apns_cert,            :string, size: 4000
      add :apns_key,             :string, size: 4000
      add :fcm_api_key,          :string
      add :android_public_key,   :string, size: 1000
      add :itunes_shared_secret, :string
      add :additional_setting,   :jsonb,  null: false, default: "{}"

      timestamps()
    end

    create unique_index(:apps, [:app_id_token])
  end

  def down do
    drop table(:apps)
  end
end
