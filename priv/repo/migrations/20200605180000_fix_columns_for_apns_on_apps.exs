defmodule RaiseServer.Migrations.FixColumnsForApnsOnApps do
  use Ecto.Migration

  def change do
    alter table(:apps) do
      remove :apns_cert
      remove :apns_key

      add :apns_team_id_token, :string
      add :apns_key_id_token,  :string
      add :apns_auth_key,      :text
    end
  end
end
