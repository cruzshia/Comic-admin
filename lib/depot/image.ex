defmodule RaiseServer.Depot.Image do
  use Ecto.Schema

  @derive Jason.Encoder
  @primary_key false
  embedded_schema do
    field :url,    :string
    field :height, :integer
    field :width,  :integer
  end
end
