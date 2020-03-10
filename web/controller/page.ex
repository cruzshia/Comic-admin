use Croma

defmodule RaiseServer.Controller.Page do
  use Antikythera.Controller

  @allowed_file ["manifest.json", "favicon.ico"]

  def show_frontend(conn) do
    Conn.send_priv_file(conn, 200, "static/index.html")
  end

  def show_static(%{request: %{path_matches: %{folder: folder, file: file}}} = conn) do
    Conn.send_priv_file(conn, 200, "static/static/#{folder}/#{file}")
  end

  def show_file(%{request: %{path_matches: %{file: file}}} = conn) do
    case file do
      file when file in @allowed_file ->
        Conn.send_priv_file(conn, 200, "/static/#{file}")
      _ ->
        Conn.put_status(conn, 403)
    end
  end
end