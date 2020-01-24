defmodule RaiseServer.Router do
  use Antikythera.Router

  get "/hello", Hello, :hello
end
