defmodule RaiseServer.Migrations.AddSubscriptionApps do
  use Ecto.Migration

  def change do
    create table(:subscription_apps) do
      add :app_id, references("apps"), null: false
      add :subscription_id, references("works"), null: false

      timestamps()
    end

    create unique_index(:subscription_apps, [:subscription_id, :app_id], name: :subscription_id_app_id_uniq)
  end
end
