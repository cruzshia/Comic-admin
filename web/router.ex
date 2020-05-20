defmodule RaiseServer.Router do
  use Antikythera.Router

  get "/api/app/v1/home", App.V1.Home.Show, :show
  post "/api/app/v1/first_launch", App.V1.FirstLaunch.Create, :create
end
