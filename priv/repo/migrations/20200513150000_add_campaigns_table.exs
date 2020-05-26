defmodule RaiseServer.Migrations.AddCamapaignsTable do
  use Ecto.Migration

  def up do
    create table(:campaigns) do
      add :name,                    :string, null: false
      add :for_management_begin_at, :utc_datetime, null: false
      add :for_management_end_at,   :utc_datetime, null: false
      add :note,                    :string, size: 1000, null: false, default: ""

      timestamps()
    end
  end

  def down do
    drop table(:campaigns)
  end
end
