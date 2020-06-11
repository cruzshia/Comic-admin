defmodule RaiseServer.Migrations.UpdateWorkCampaignAppsTable do
  use Ecto.Migration

  def change do
    create unique_index(:work_campaign_apps, [:work_campaign_id, :app_id])
    create index(:work_campaign_apps, [:app_id])
  end
end
