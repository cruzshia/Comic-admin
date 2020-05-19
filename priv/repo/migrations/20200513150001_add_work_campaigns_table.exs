defmodule RaiseServer.Migrations.AddWorkCampaignsTable do
  use Ecto.Migration

  def up do
    create table(:work_campaigns) do
      add :campaign_id,               references("campaigns"), null: false
      add :work_id,                   references("works"),     null: false
      add :begin_at,                  :utc_datetime,           null: false
      add :end_at,                    :utc_datetime,           null: false
      add :priority,                  :integer,                null: false, default: 0
      add :description,               :string,                 null: true
      add :images,                    :map,                    default: %{}
      add :free_range,                :string,                 null: true
      add :free_range_display_string, :string,                 null: true

      timestamps()
    end

    create unique_index(:work_campaigns, [:campaign_id, :work_id], name: :campaign_id_work_id)
    create index(:work_campaigns, [:work_id, :begin_at, :end_at])
  end

  def down do
    drop table(:work_campaigns)
  end
end
