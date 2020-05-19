use Croma

defmodule RaiseServer.Apps do
  import Ecto.Query

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.Apps.{App, AppScreenSetting}

  @doc """
  get App record from db
  """
  defun get_app(token :: v[String.t]) :: App.t | nil do
    Repo.get_by(App, app_id_token: token)
  end

  @doc """
  return page setting
  """
  defun get_page_setting(app_id :: v[integer], screen_type :: v[atom], opts :: list \\ []) :: v[map | nil] do
    datetime = Keyword.get(opts, :at, DateTime.utc_now)

    case get_screen_setting_query(app_id, screen_type, datetime) |> Repo.one() do
      %AppScreenSetting{setting: setting_str} ->
        :jsx.decode(setting_str, [return_maps: true])
      e ->
        e
    end
  end

  defp get_screen_setting_query(app_id, screen, datetime) do
    AppScreenSetting
    |> where(app_id: ^app_id, screen: ^screen)
    |> where([s], s.publish_begin_at <= ^datetime)
    |> first([desc: :publish_begin_at])
  end
end
