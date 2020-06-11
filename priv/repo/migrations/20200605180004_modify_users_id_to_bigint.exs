defmodule RaiseServer.Migrations.ModifyUsersIdToBigint do
  use Ecto.Migration

  def up do
    alter table(:users) do
      modify :id, :bigint, null: false
    end
    alter table(:devices) do
      modify :user_id, :bigint, null: false
    end
  end

  def down do
    alter table(:users) do
      modify :id, :integer, null: false
    end
    alter table(:devices) do
      modify :user_id, :integer, null: false
    end
  end
end
