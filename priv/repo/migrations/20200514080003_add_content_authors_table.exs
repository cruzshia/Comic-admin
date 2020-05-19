defmodule RaiseServer.Migrations.AddContentAuthorsTable do
  use Ecto.Migration

  def up do
    create table(:content_authors) do
      add :content_id, references("contents", type: :serial), null: false
      add :author_id,  references("authors", type: :serial), null: false
      add :sort_code,  :integer, null: false, default: 0

      timestamps()
    end

    create unique_index(:content_authors, [:author_id, :content_id], name: :author_id_content_id)
    create index(:content_authors, [:content_id, :sort_code])
  end

  def down do
    drop table(:content_authors)
  end
end
