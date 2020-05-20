defmodule RaiseServer.Migrations.AddUsersTable do
  use Ecto.Migration

  def up do
    create table(:users, primary_key: false) do
      add :id,                         :serial, primary_key: true
      add :nickname,                   :string, null: false
      add :gender,                     :integer
      add :birthday,                   :date
      add :email,                      :string
      add :password_hash,              :string
      add :password_salt,              :string
      add :last_launch_date,           :utc_datetime, null: false
      add :auth_token,                 :string
      add :auth_token_inserted_at,     :utc_datetime
      add :status,                     :integer, null: false
      add :withdraw_date,              :utc_datetime
      add :comment_contributor_type,   :integer, null: false
      add :comment_status,             :integer, null: false
      add :comment_restriction_period, :utc_datetime

      timestamps()
    end

    create unique_index(:users, [:email], where: "status = 0")
    create unique_index(:users, [:auth_token])
  end

  def down do
    drop table(:users)
  end
end
