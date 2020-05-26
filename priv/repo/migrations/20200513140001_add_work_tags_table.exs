defmodule RaiseServer.Migrations.WorkTagsTable do
  use Ecto.Migration

  def up do
    create table(:work_tags) do
      add :tag_id,    references("tags"), null: false
      add :work_id,   references("works"), null: false
      add :tag_group, :string, null: false
      add :sort_code, :integer, null: false, default: 0

      timestamps()
    end

    create unique_index(:work_tags, [:work_id, :tag_group, :tag_id],  name: :work_id_tag_group_tag_id_uniq)
    create index(:work_tags, [:tag_group, :tag_id, :sort_code, :work_id])
  end

  def down do
    drop table(:work_tags)
  end
end
