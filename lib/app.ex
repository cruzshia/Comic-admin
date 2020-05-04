use Croma

defmodule RaiseServer.App do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  @type t :: %__MODULE__{}

  @primary_key     {:id, :integer, []}
  @timestamps_opts [type: :utc_datetime]

  schema "apps" do
    field :app_id_token,         :string
    field :name,                 :string
    field :common_key,           :binary
    field :apns_cert,            :string
    field :apns_key,             :string
    field :fcm_api_key,          :string
    field :android_public_key,   :string
    field :itunes_shared_secret, :string
    field :additional_setting,   :map, default: %{}

    timestamps()
  end

  defun changeset(app :: Schema.t, attrs :: v[map]) :: Changeset.t do
    app
    |> cast(
      attrs,
      [
        :id,
        :app_id_token,
        :name,
        :common_key,
        :apns_cert,
        :apns_key,
        :fcm_api_key,
        :android_public_key,
        :itunes_shared_secret,
        :additional_setting,
      ]
    )
    # TODO: validate_format()
    |> validate_required([
      :app_id_token,
      :name,
      :common_key,
    ])
    |> unique_constraint(:app_id_token)
  end

  defun get_by_id(id :: v[integer]) :: t | nil do
    Repo.get_by(__MODULE__, id: id)
  end
end
