defmodule RaiseServer.Migrations.AddAuthorsTable do
  use Ecto.Migration

  def up do
    create table(:authors) do
      add :name,                :string, null: false
      add :name_kana,           :string, null: false, default: ""
      add :search_text,         :text, null: false, default: ""
      add :ngramed_search_text, :text, null: false, default: ""

      timestamps()
    end
  end

  def down do
    drop table(:authors)
  end
end
