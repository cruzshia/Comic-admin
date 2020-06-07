defmodule RaiseServer.Migrations.AddIsPrContentToContents do
  use Ecto.Migration

  def change do
    alter table(:contents) do
      add :is_pr_content, :boolean
    end
  end
end
