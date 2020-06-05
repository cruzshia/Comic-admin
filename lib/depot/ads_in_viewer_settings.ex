defmodule RaiseServer.Depot.AdsInViewerSettings do
  use Ecto.Schema

  alias RaiseServer.Depot.AdsInViewerSetting

  @type t :: %__MODULE__{}
  @primary_key false
  embedded_schema do
    field       :device,    :string
    embeds_many :front_ads, AdsInViewerSetting
    embeds_many :back_ads,  AdsInViewerSetting
  end
end
