defmodule RaiseServer.Migrations.AddWorkApps do
  use Ecto.Migration

  def change do
    create table(:work_apps) do
      add :app_id,  references("apps"), null: false
      add :work_id, references("works"), null: false

      timestamps()
    end
    create unique_index(:work_apps, [:work_id, :app_id])
  end
end
