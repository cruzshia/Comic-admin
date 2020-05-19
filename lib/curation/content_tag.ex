use Croma

defmodule RaiseServer.Curation.ContentTag do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  alias RaiseServer.Curation

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "content_tags" do
    field :tag_group, :string
    field :sort_code, :integer
    field :content_id, :integer
    belongs_to :tag, Curation.Tag

    timestamps()
  end

  defun changeset(content_tags :: Schema.t, attrs :: v[map]) :: Changeset.t do
    content_tags
    |> cast(
      attrs,
      [
        :tag_group,
        :sort_code,
      ]
    )
    |> validate_required(
      [
        :id,
        :tag_id,
        :content_id,
        :tag_group,
        :sort_code,
      ]
    )
    |> validate_number(:sort_code, greater_than_or_equal_to: 0)
    |> foreign_key_constraint(:tag_id)
    |> foreign_key_constraint(:content_id)
    |> unique_constraint(:content_id, name: :content_id_tag_group_tag_id)
  end
end
