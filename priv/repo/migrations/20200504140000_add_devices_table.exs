defmodule RaiseServer.Migrations.AddDevicesTable do
  use Ecto.Migration

  def up do
    create table(:devices, primary_key: false) do
      add :id,                         :serial, primary_key: true
      add :user_id,                    references("users", type: :serial), null: false
      add :guest_user_before_login_id, :integer
      add :v2_device_id_token,         :string
      add :os_info,                    :string, null: false
      add :model,                      :string, null: false
      add :name,                       :string
      add :idfv,                       :string
      add :apns_token,                 :string
      add :android_id_token,           :string
      add :fcm_token,                  :string

      timestamps()
    end

    create unique_index(:devices, [:v2_device_id_token])
  end

  def down do
    drop table(:devices)
  end
end
