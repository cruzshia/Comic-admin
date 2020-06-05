use Croma

defmodule RaiseServer.Controller.Console.V1.Works.Detail do
  use RaiseServer.Controller.Api

  alias RaiseServer.Controller.Api
  alias RaiseServer.Controller.Console.V1.Works.Helper
  alias RaiseServer.Depot

  plug Antikythera.Plug.IpFiltering, :check_by_static_ranges, [ranges: RaiseServer.Controller.Console.V1.Ip.ip_ranges()]
  plug RaiseServer.Plug.VerifyConsoleApiToken, :verify, []

  defun get(%Conn{request: %Request{path_matches: %{id: id}}} = conn) :: Conn.t do
    Api.validate_params(conn, id, &Croma.Result.wrap_if_valid(&1, Helper.Id), fn(work_id) ->
      case Helper.get_work(work_id) do
        nil ->
          RaiseServer.Helper.ErrorJson.json_by_error(conn, RaiseServer.Error.ResourceNotFound.new())
        work ->
          Conn.json(conn, 200, to_response(work))
      end
    end)
  end

  defunp to_response(work :: Depot.Work.t) :: map do
    %{
      id:                              Helper.add_resource_prefix(work),
      title:                           work.title,
      title_kana:                      work.title_kana,
      work_type:                       work.work_type,
      inserted_at:                     work.inserted_at,
      updated_at:                      work.updated_at,
      episode_work_type:               work.episode_work_type,
      update_frequency:                work.update_frequency,
      images:                          Helper.format_images(work.images),
      description:                     work.description,
      authors:                         Enum.map(work.authors, fn(author) -> Map.take(author, [:id, :name]) end),
      apps:                            Enum.map(work.apps, fn(app) -> Map.take(app, [:id, :name]) end),
      subscription:                    (if is_nil(work.subscription), do: nil, else: Map.take(work.subscription, [:id, :name])),
      publish_begin_at:                work.publish_begin_at,
      publish_end_at:                  work.publish_end_at,
      magazine_name:                   work.magazine_name,
      free_periodical_day_of_the_week: work.free_periodical_day_of_the_week,
      return_ad_revenue:               work.return_ad_revenue,
      ads_in_viewer_setting:           Enum.map(work.ads_in_viewer_setting, &Helper.format_ads_in_viewer_setting/1),
    }
    |> Helper.drop_nil_field()
  end
end
