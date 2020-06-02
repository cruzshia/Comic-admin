defmodule RaiseServer.Router do
  use Antikythera.Router

  get "/api/app/v1/home", App.V1.Home.Show, :show
  get "/api/app/v1/free/periodical", App.V1.Free.Periodical.Show, :show
  get "/api/app/v1/free/only_now", App.V1.Free.OnlyNow.Show, :show
  post "/api/app/v1/first_launch", App.V1.FirstLaunch.Create, :create
end
