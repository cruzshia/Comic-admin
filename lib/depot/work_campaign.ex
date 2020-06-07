use Croma

defmodule RaiseServer.Depot.WorkCampaign do
  use Ecto.Schema

  #import Ecto.Changeset
  #alias Ecto.{Changeset, Schema}

  alias RaiseServer.Depot

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "work_campaigns" do
    belongs_to :campaign,                  Depot.Campaign
    belongs_to :work,                      Depot.Work
    field      :name,                      :string
    field      :begin_at,                  :utc_datetime
    field      :end_at,                    :utc_datetime
    field      :priority,                  :integer, default: 0
    field      :description,               :string
    embeds_one :images,                    Depot.Images
    field      :free_range,                :string
    field      :free_range_display_string, :string

    has_one :work_campaign_app, Depot.WorkCampaignApp

    timestamps()
  end

  # defun changeset(work_campaign :: Schema.t, attrs :: v[map]) :: Changeset.t do
  #   work_campaign
  #   |> cast(
  #     attrs,
  #     [
  #       :campaign_id,
  #       :work_id,
  #       :begin_at,
  #       :end_at,
  #       :priorty,
  #       :description,
  #       :images,
  #     ]
  #   )
  #   |> validate_required([
  #     :campaign_id,
  #     :work_id,
  #     :begin_at,
  #     :end_at
  #     :free_range,
  #     :free_range_display_string
  #   ])
  #   |> foreign_key_constraint(:campaign_id)
  #   |> foreign_key_constraint(:work_id)
  #   |> unique_constraint(:campaign_id, name: :campaign_id_work_id)
  # end
end
