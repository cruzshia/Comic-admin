defmodule RaiseServer.Router do
  use Antikythera.Router

  # Frontend
  get "/",                     Page, :show_frontend
  get "/static/:folder/:file", Page, :show_static
  get "/:file",                Page, :show_file
end
