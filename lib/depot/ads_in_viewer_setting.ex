defmodule RaiseServer.Depot.AdsInViewerSetting do
  use Ecto.Schema

  @primary_key false
  embedded_schema do
    field :type,           :string
    field :image_url,      :string
    field :button_wording, :string
    field :action_url,     :string
    field :begin_at,       :utc_datetime
    field :end_at,         :utc_datetime
  end
end
