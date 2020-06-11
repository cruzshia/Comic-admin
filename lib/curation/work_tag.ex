use Croma

defmodule RaiseServer.Curation.WorkTag do
  use Ecto.Schema
  #import Ecto.Changeset

  #alias Ecto.{Changeset, Schema}
  alias RaiseServer.{Curation, Depot}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "work_tags" do
    belongs_to :tag,    Curation.Tag
    belongs_to :work,   Depot.Work
    field :tag_group,   :string
    field :sort_code,   :integer

    timestamps()
  end

  # defun changeset(work_tag :: v[Schema.t], attrs :: v[map]) :: Changeset.t do
  #   work_tag
  #   |> cast(
  #     attrs,
  #     [
  #       :id,
  #       :tag_id,
  #       :work_id,
  #       :tag_group,
  #       :sort_code,
  #     ]
  #   )
  #   |> validate_required(
  #     [
  #       :id,
  #       :tag_id,
  #       :work_id,
  #       :tag_group,
  #       :sort_code,
  #     ]
  #   )
  #   |> validate_number(:sort_code, greater_than_or_equal_to: 0)
  #   |> foreign_key_constraint(:tag_id)
  #   |> foreign_key_constraint(:work_id)
  #   |> unique_constraint(:work_id, name: :work_id_tag_group_tag_id)
  # end
end
