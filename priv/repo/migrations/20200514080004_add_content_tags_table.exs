defmodule RaiseServer.Migrations.AddContentTagsTable do
  use Ecto.Migration

  def up do
    create table(:content_tags) do
      add :tag_id,     references("tags"), null: false
      add :content_id, references("contents"), null: false
      add :sort_code,  :integer, null: false, default: 0
      add :tag_group,  :string, null: false

      timestamps()
    end

    create unique_index(:content_tags, [:content_id, :tag_group, :tag_id], name: :content_id_tag_group_tag_id)
    create index(:content_tags, [:tag_group, :tag_id, :sort_code, :content_id])
  end

  def down do
    drop table(:content_tags)
  end
end
