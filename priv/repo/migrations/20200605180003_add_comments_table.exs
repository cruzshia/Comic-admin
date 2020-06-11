defmodule RaiseServer.Migrations.AddCommentsTable do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :user_id,    references("users"),    null: false
      add :content_id, references("contents"), null: false
      add :app_id,     references("apps"),     null: false
      add :message,      :text,    null: false
      add :status,       :integer, null: false, default: 0
      add :like_count,   :integer, null: false, default: 0
      add :report_count, :integer, null: false, default: 0

      timestamps()
    end

    create index(:comments, [:content_id, :status])
    create index(:comments, :user_id)
  end
end
