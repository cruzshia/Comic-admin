defmodule RaiseServer.Migrations.AddWorkAssessmentsTable do
  use Ecto.Migration

  def up do
    create table(:work_assessments) do
      add :work_id,        references("works", type: :serial), null: false
      add :view_count,     :integer, null: false, default: 0
      add :like_count,     :integer, null: false, default: 0
      add :comment_count,  :integer, null: false, default: 0
      add :favorite_count, :integer, null: false, default: 0

      timestamps()
    end

    create unique_index(:work_assessments, :work_id)
  end

  def down do
    drop table(:work_assessments)
  end
end
