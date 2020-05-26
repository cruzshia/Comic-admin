defmodule RaiseServer.Router do
  use Antikythera.Router

  # Frontend
  get "/",                     Page, :show_frontend
  get "/static/*path",         Page, :show_static
  get "/:file",                Page, :show_file

  get "/api/app/v1/home", App.V1.Home.Show, :show
  post "/api/app/v1/first_launch", App.V1.FirstLaunch.Create, :create
end
