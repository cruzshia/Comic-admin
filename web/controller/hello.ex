defmodule RaiseServer.Controller.Hello do
  use Antikythera.Controller

  def hello(conn) do
    RaiseServer.Gettext.put_locale(conn.request.query_params["locale"] || "en")
    Conn.render(conn, 200, "hello", [gear_name: :raise_server])
  end
end
