defmodule RaiseServer.Migrations.AddContentAppsTable do
  use Ecto.Migration

  def up do
    create table(:content_apps) do
      add :content_id, references("contents", type: :serial), null: false
      add :app_id,     references("apps", type: :serial), null: false

      timestamps()
    end

    create unique_index(:content_apps, [:content_id, :app_id], name: :content_id_app_id)
    create index(:content_apps, :app_id)
  end

  def down do
    drop table(:content_apps)
  end
end
