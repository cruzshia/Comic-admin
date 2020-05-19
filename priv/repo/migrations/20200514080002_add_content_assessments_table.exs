defmodule RaiseServer.Migrations.AddContentAssessmentsTable do
  use Ecto.Migration

  def up do
    create table(:content_assessments) do
      add :content_id,    references("contents", type: :serial), null: false
      add :view_count,    :integer, null: false, default: 0
      add :like_count,    :integer, null: false, default: 0
      add :comment_count, :integer, null: false, default: 0

      timestamps()
    end

    create unique_index(:content_assessments, :content_id)
  end

  def down do
    drop table(:content_assessments)
  end
end
