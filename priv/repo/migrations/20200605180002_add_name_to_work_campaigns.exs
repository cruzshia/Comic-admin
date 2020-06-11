defmodule RaiseServer.Migrations.AddNameToWorkCampaigns do
  use Ecto.Migration

  def change do
    alter table(:work_campaigns) do
      add :name, :string, null: false, default: ""
    end
  end
end
