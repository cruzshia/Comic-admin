defmodule RaiseServer.Migrations.UpdateWorksDescription do
  use Ecto.Migration

  def change do
    alter table(:works) do
      modify :description, :string, size: 1000, null: false, default: ""
    end
  end
end
