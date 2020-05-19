defmodule RaiseServer.Depot.Subscription do
  use Ecto.Schema

  schema "subscriptions" do
    field :name, :string
    field :subscription_appeal_image, :map
    field :publish_begin_at, :utc_datetime
    field :publish_end_at, :utc_datetime

    timestamps()
  end
end
