use Croma

defmodule RaiseServer.Depot.Author do
  use Ecto.Schema

  #import Ecto.Changeset
  #alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "authors" do
    field :name,      :string
    field :name_kana, :string, default: ""

    timestamps()
  end

  # defun changeset(author :: Schema.t, attrs :: v[map]) :: Changeset.t do
  #   author
  #   |> cast(
  #     attrs,
  #     [
  #       :name,
  #       :name_kana,
  #     ]
  #   )
  #   |> validate_format(:name_kana, ~r/\A[\p{Katakana}ー\d\p{Zs}]*\Z/u, message: "not valid Katakana")
  #   |> validate_required([
  #     :name,
  #     :name_kana,
  #   ])
  # end
end
