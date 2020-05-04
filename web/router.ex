defmodule RaiseServer.Router do
  use Antikythera.Router

  get "/api/app/v1/home", App.V1.Home.Show, :show
end
