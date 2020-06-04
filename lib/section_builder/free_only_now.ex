use Croma

defmodule RaiseServer.SectionBuilder.FreeOnlyNow do

  alias RaiseServer.{Depot, TimeZoneDatabase}
  alias RaiseServer.SectionBuilder.Utils

  @seven_days_in_seconds 604_800
  @one_day_in_seconds 60 * 60 * 24
  @update_string "更新"

  defun process_sections(app_id :: v[integer], now :: DateTime.t, %{"sections" => sections} = only_now_setting :: v[map]) :: map do
    %{only_now_setting |
      "sections" => Enum.map(sections, &process(&1, app_id, now))
    }
  end

  defunpt process(section :: map, app_id :: integer, now :: DateTime.t) :: map do
    do_process(section, app_id, now)
  end

  defp do_process(%{"type" => "limited_time_free"} = section, app_id, now) do
    jst_today_start =
      now
      |> DateTime.shift_zone("Asia/Tokyo", TimeZoneDatabase)
      |> elem(1)
      |> Map.merge(%{hour: 0, minute: 0, second: 0, microsecond: {0, 0}})

    jst_tomorrow_start =
      now
      |> DateTime.add(@one_day_in_seconds)
      |> DateTime.shift_zone("Asia/Tokyo", TimeZoneDatabase)
      |> elem(1)
      |> Map.merge(%{hour: 0, minute: 0, second: 0, microsecond: {0, 0}})

      works = Depot.get_works(
      app_id,
      [work_type: :episode, episode_work_type: :reprint, published_period: now],
      [free_ppv_begin_date: {jst_today_start, jst_tomorrow_start}]
    )
    |> Enum.map(fn %{title: title, images: images, contents: %{name: content_name}} = work ->
        update_display_string =
        case String.split(content_name, ["[", "]"]) |> Enum.at(1) do
          nil -> ""
          splitted_content_name -> splitted_content_name <> @update_string
        end
      %{
        "id" => Utils.add_resource_prefix(work),
        "title" => title,
        "image" => Utils.format_image(images.image1),
        "update_display_string" => update_display_string
      }
    end)

    Map.put(section, "works", works)
  end

  defp do_process(%{"type" => "read_in_one_go", "recommended_work_id" => recommended_work_id_str} = section, app_id, now) do
    works =
      Depot.get_work_campaigns(app_id, [{:campaign_period, now}, :free_range_exists], [:read_in_one_go_order])
      |> Enum.map(fn work_campaign ->
        build_read_in_one_go_response(work_campaign, recommended_work_id_str, now)
      end)
      |> Enum.sort(&(&1["is_recommended"] >= &2["is_recommended"]))

    Map.delete(section, "recommended_work_id")
    |> Map.put("works", works)
  end

  defp do_process(%{"type" => "limited_time_free_comic", "content_ids" => content_ids} = section, app_id, now) do
    int_content_ids = Utils.ids_to_int(content_ids)

    contents =
      Depot.get_contents(app_id, [id: int_content_ids, free_for_limited_time: true, published_period: now])
      |> Enum.map(fn %{name: name, thumbnail_image: thumbnail_image, publish_end_at: publish_end_at} = content ->
        %{
          "id" => Utils.add_resource_prefix(content),
          "name" => name,
          "thumbnail_image" => Utils.format_image(thumbnail_image),
          "end_at" => publish_end_at,
        }
      end)

    Map.delete(section, "content_ids")
    |> Map.put("contents", contents)
  end

  defp build_read_in_one_go_response(work_campaign, recommended_work_id_str, now) do
    %{
      end_at: end_at,
      free_range_display_string: free_range_display_string,
      work: %{images: images, title: title, publish_begin_at: publish_begin_at} = work,
    } = work_campaign
    %{
      "id" => Utils.add_resource_prefix(work),
      "title" => title,
      "image" => Utils.format_image(images.image1),
      "end_at" => end_at,
      "new_rensai_badge" => DateTime.diff(now, publish_begin_at) < @seven_days_in_seconds,
      "is_recommended" => recommended_work_id_str == Utils.add_resource_prefix(work),
      "free_range_display_string" => free_range_display_string,
    }
  end
end
