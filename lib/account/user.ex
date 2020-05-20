use Croma

defmodule RaiseServer.Account.User do
  use Ecto.Schema

  import Ecto.Changeset
  alias Ecto.{Changeset, Schema}

  @type t :: %__MODULE__{}
  @timestamps_opts [type: :utc_datetime]

  schema "users" do
    field :nickname,                   :string, default: ""
    field :gender,                     RaiseServer.GenderEnum
    field :birthday,                   :date
    field :email,                      :string
    field :password_hash,              :string
    field :password_salt,              :string
    field :last_launch_date,           :utc_datetime, autogenerate: {Ecto.Schema, :__timestamps__, [:utc_datetime]}
    field :auth_token,                 :string
    field :auth_token_inserted_at,     :utc_datetime
    field :status,                     RaiseServer.StatusEnum, default: 0
    field :withdraw_date,              :utc_datetime
    field :comment_contributor_type,   RaiseServer.CommentContributorTypeEnum, default: 0
    field :comment_status,             RaiseServer.CommentStatusEnum, default: 0
    field :comment_restriction_period, :utc_datetime
    has_many :devices, RaiseServer.Account.Device

    timestamps()
  end

  defun changeset(user :: Schema.t, attrs :: v[map]) :: Changeset.t do
    user
    |> cast(
      attrs,
      [
        :nickname,
        :gender,
        :birthday,
        :email,
        :password_hash,
        :password_salt,
        :last_launch_date,
        :auth_token,
        :auth_token_inserted_at,
        :status,
        :withdraw_date,
        :comment_contributor_type,
        :comment_status,
        :comment_restriction_period,
      ]
    )
    |> unique_constraint(:auth_token)
    |> unique_constraint(:email)
  end
end
