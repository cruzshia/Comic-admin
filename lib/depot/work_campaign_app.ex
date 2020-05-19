use Croma

defmodule RaiseServer.Depot.WorkCampaignApp do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "work_campaign_apps" do
    belongs_to :work_campaign, RaiseServer.Depot.WorkCampaign
    belongs_to :app, RaiseServer.Apps.App

    timestamps()
  end

  defun changeset(work_campaign_app :: Schema.t, attrs :: v[map]) :: Changeset.t do
    work_campaign_app
    |> cast(
      attrs,
      [
        :work_campaign_id,
        :app_id,
      ]
    )
    |> validate_required([
      :work_campaign_id,
      :app_id,
    ])
    |> foreign_key_constraint(:work_campaign_id)
    |> foreign_key_constraint(:app_id)
  end
end
