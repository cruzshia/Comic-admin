defmodule RaiseServer.Migrations.AddSubscriptions do
  use Ecto.Migration

  def change do
    create table(:subscriptions) do
      add :name, :string, null: false
      add :subscription_appeal_image, :map
      add :publish_begin_at, :utc_datetime, null: false
      add :publish_end_at, :utc_datetime, null: false
      timestamps()
    end
  end
end
