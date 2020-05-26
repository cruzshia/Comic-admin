use Croma

defmodule RaiseServer.Account.Device do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}
  @timestamps_opts [type: :utc_datetime]

  schema "devices" do
    field :guest_user_before_login_id, :integer
    field :v2_device_id_token,         :string
    field :os_info,                    :string, default: ""
    field :model,                      :string, default: ""
    field :name,                       :string
    field :idfv,                       :string
    field :apns_token,                 :string
    field :android_id_token,           :string
    field :fcm_token,                  :string
    belongs_to :user, RaiseServer.Account.User

    timestamps()
  end

  defun changeset(device :: Schema.t, attrs :: v[map]) :: Changeset.t do
    device
    |> cast(
      attrs,
      [
        :guest_user_before_login_id,
        :v2_device_id_token,
        :os_info,
        :model,
        :name,
        :idfv,
        :apns_token,
        :android_id_token,
        :fcm_token,
      ]
    )
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:v2_device_id_token)
  end
end
