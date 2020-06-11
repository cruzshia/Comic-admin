defmodule RaiseServer.Migrations.AddWorkCampaignAppsTable do
  use Ecto.Migration

  def up do
    create table(:work_campaign_apps) do
      add :work_campaign_id, references("work_campaigns"), null: false
      add :app_id,           references("apps"), null: false

      timestamps()
    end
  end

  def down do
    drop table(:work_campaign_apps)
  end
end
