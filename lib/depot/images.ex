defmodule RaiseServer.Depot.Images do
  use Ecto.Schema

  alias RaiseServer.Depot.Image

  @derive Jason.Encoder
  @primary_key false
  embedded_schema do
    embeds_one :image1, Image
    embeds_one :image2, Image
    embeds_one :image3, Image
    embeds_one :image4, Image
  end
end
