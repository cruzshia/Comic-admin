defmodule RaiseServer.Migrations.AddWorkAuthorsTable do
  use Ecto.Migration

  def up do
    create table(:work_authors) do
      add :work_id,   references("works", type: :serial), null: false
      add :author_id, references("authors", type: :serial), null: false
      add :sort_code, :integer, null: false, default: 0

      timestamps()
    end

    create unique_index(:work_authors, [:author_id, :work_id], name: :author_id_work_id_uniq)
    create index(:work_authors, [:work_id, :sort_code], name: :work_id_sort_code_index)
  end

  def down do
    drop table(:work_authors)
  end
end
