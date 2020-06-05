defmodule RaiseServer.Router do
  use Antikythera.Router

  get "/api/app/v1/home", App.V1.Home, :get

  get "/api/app/v1/free/periodical", App.V1.Free.Periodical, :get
  get "/api/app/v1/free/only_now",   App.V1.Free.OnlyNow,    :get
  get "/api/app/v1/free/one_shot",   App.V1.Free.OneShot,    :get

  get "/api/app/v1/search/top", App.V1.Search.Top, :get

  post "/api/app/v1/first_launch", App.V1.FirstLaunch, :post

end
