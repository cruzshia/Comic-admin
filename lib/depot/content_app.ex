use Croma

defmodule RaiseServer.Depot.ContentApp do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "content_apps" do
    belongs_to :content, RaiseServer.Depot.Content
    belongs_to :app, RaiseServer.Apps.App

    timestamps()
  end

  defun changeset(content_authors :: Schema.t, attrs :: v[map]) :: Changeset.t do
    content_authors
    |> cast(
      attrs,
      []
    )
    |> validate_required([
      :content_id,
      :app_id,
    ])
    |> foreign_key_constraint(:content_id)
    |> foreign_key_constraint(:app_id)
    |> unique_constraint(:content_id, name: :content_id_app_id)
  end
end
