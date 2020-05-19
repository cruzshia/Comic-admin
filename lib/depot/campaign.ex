use Croma

defmodule RaiseServer.Depot.Campaign do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "campaigns" do
    field :name, :string
    field :for_management_begin_at, :utc_datetime
    field :for_management_end_at, :utc_datetime
    field :note, :string, default: ""

    timestamps()
  end

  defun changeset(campaign :: Schema.t, attrs :: v[map]) :: Changeset.t do
    campaign
    |> cast(
      attrs,
      [
        :name,
        :for_management_begin_at,
        :for_management_end_at,
        :note,
      ]
    )
    |> validate_required(:name)
  end
end
