use Croma

defmodule RaiseServer.Depot.WorkAssessment do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  alias RaiseServer.Depot

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "work_assessments" do
    field :view_count,     :integer, default: 0
    field :like_count,     :integer, default: 0
    field :comment_count,  :integer, default: 0
    field :favorite_count, :integer, default: 0
    belongs_to :work,      Depot.Work

    timestamps()
  end

  defun changeset(work_assessments :: Schema.t, attrs :: v[map]) :: Changeset.t do
    work_assessments
    |> cast(
      attrs,
      [
        :view_count,
        :like_count,
        :comment_count,
      ]
    )
    |> validate_required([
      :work_id,
      :view_count,
      :like_count,
      :comment_count,
    ])
    |> validate_number(:view_count, greater_than_or_equal_to: 0)
    |> validate_number(:like_count, greater_than_or_equal_to: 0)
    |> validate_number(:comment_count, greater_than_or_equal_to: 0)
    |> foreign_key_constraint(:work_id)
    |> unique_constraint(:work_id)
  end
end
