use Croma

defmodule RaiseServer.SectionBuilder.FreeOneShot do
  alias RaiseServer.Depot

  alias RaiseServer.SectionBuilder.Utils

  defun process(app_id :: v[integer], now :: DateTime.t, orig_setting :: v[map], opts :: v[list] \\ []) :: map do
    {recommended_str_id, setting} = Map.pop(orig_setting, "recommended_work_id")

    limit = Keyword.get(opts, :limit)
    offset = Keyword.get(opts, :offset)

    filters = [episode_work_type: :one_shot]
    options = [
      join_latest_content_order_by_publish_begin_at: app_id,
      preload: [:authors],
      limit: limit,
      offset: offset
    ]
    |> process_recommended(recommended_str_id)

    case Depot.get_works(app_id, filters, options) do
      [_ | _] = works ->
        %{
          "total_count" => Depot.count_works(app_id, [episode_work_type: :one_shot]),
          "works" => Enum.map(works, fn work ->
            prefixed_id = Utils.add_resource_prefix(work)
            %{
              "id" => prefixed_id,
              "title" => work.title,
              "image" => Utils.format_image(work.images.image1),
              "publish_begin_at" => work.last_content_published_at,
              "authors" => Enum.map(work.authors, fn author ->
                %{"name" => author.name, "name_kana" => author.name_kana}
              end),
              "new_arrival_badge" => Utils.is_new_arrival(work.publish_begin_at, now),
              "is_recommended" => recommended_str_id == prefixed_id
            }
          end)
        }
        |> Map.merge(setting)

      _ -> nil
    end
  end

  defp process_recommended(opts, <<_::binary-size(2)>> <> str_id), do: [{:recommended_work_first, str_id} | opts]

  defp process_recommended(opts, _), do: opts
end
