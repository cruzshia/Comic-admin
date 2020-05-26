use Croma

defmodule RaiseServer.Depot.WorkAuthor do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "work_authors" do
    field :sort_code, :integer, default: 0
    belongs_to :author, RaiseServer.Depot.Author
    belongs_to :work,   RaiseServer.Depot.Work

    timestamps()
  end

  defun changeset(work_authors :: Schema.t, attrs :: v[map]) :: Changeset.t do
    work_authors
    |> cast(
      attrs,
      [
        :sort_code,
      ]
    )
    |> validate_required([
      :author_id,
      :work_id,
      :sort_code,
    ])
    |> validate_number(:sort_code, greater_than_or_equal_to: 0)
    |> foreign_key_constraint(:author_id)
    |> foreign_key_constraint(:work_id)
    |> unique_constraint(:author_id, name: :author_id_work_id)
  end
end
