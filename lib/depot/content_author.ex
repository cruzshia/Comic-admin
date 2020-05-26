use Croma

defmodule RaiseServer.Depot.ContentAuthor do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "content_authors" do
    field :sort_code, :integer, default: 0
    belongs_to :author,  RaiseServer.Depot.Author
    belongs_to :content, RaiseServer.Depot.Content

    timestamps()
  end

  defun changeset(content_authors :: Schema.t, attrs :: v[map]) :: Changeset.t do
    content_authors
    |> cast(
      attrs,
      [
        :sort_code,
      ]
    )
    |> validate_required([
      :author_id,
      :content_id,
      :sort_code,
    ])
    |> validate_number(:sort_code, greater_than_or_equal_to: 0)
    |> foreign_key_constraint(:author_id)
    |> foreign_key_constraint(:content_id)
    |> unique_constraint(:author_id, name: :author_id_content_id)
  end
end
