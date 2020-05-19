defmodule RaiseServer.Migrations.TagsTable do
  use Ecto.Migration

  def up do
    create table(:tags) do
      add :name, :string, null: false

      timestamps()
    end

    create unique_index(:tags, :name)
  end

  def down do
    drop table(:tags)
  end
end
