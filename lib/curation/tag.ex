use Croma

defmodule RaiseServer.Curation.Tag do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "tags" do
    field :name, :string

    timestamps()
  end

  defun changeset(tag :: v[Schema.t], attrs :: v[map]) :: Changeset.t do
    tag
    |> cast(attrs, [:id, :name])
    |> validate_required( [:id, :name])
    |> unique_constraint(:name)
  end
end
