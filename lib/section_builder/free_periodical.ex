use Croma

defmodule RaiseServer.SectionBuilder.FreePeriodical do

  alias RaiseServer.Depot
  alias RaiseServer.SectionBuilder.Utils

  @seven_days_in_seconds 604_800

  defun process(app_id :: v[integer], now :: DateTime.t, recommended_setting :: v[map]) :: map do
    [
      {"monday", "月"},
      {"tuesday", "火"},
      {"wednesday", "水"},
      {"thursday", "木"},
      {"friday", "金"},
      {"saturday", "土"},
      {"sunday", "日"},
      {"other", "他"},
    ]
    |> Enum.into(%{}, fn {dow_en, dow_jp} ->
      {dow_en, process(app_id, now, dow_jp, recommended_setting[dow_en]["recommended_work_id"])}
    end)
  end

  defunpt process(app_id :: integer, now :: DateTime.t, day_of_week :: String.t, prefix_recommended_work_id :: String.t) :: [map] do
    recommended_work_id = Utils.parse_resource_prefix(prefix_recommended_work_id)

    filters = [published_period: now, like: {:free_periodical_day_of_the_week, "%#{day_of_week}%"}]
    opts = [preload: [:authors, {:latest_content_update_at, {app_id, now}}]]
    Depot.get_works(app_id, filters, opts)
    |> Enum.map(fn %{title: title, title_kana: title_kana, authors: authors, images: images, publish_begin_at: publish_begin_at, contents: contents} = work ->
      is_recommended_work = is_recommended(work, recommended_work_id)
      content = case contents do
        []        -> nil
        [content] -> content
      end
      {content_update_at_diff, content_update_at} = get_content_update_at_info(content, now)
      response = %{
        "id" => Utils.add_resource_prefix(work),
        "title" => title,
        "authors" => Enum.map(authors, fn author -> %{"name" => author.name, "name_kana" => author.name_kana} end),
        "image" => is_recommended_work && Utils.format_image(images.image2) || Utils.format_image(images.image1),
        "new_rensai_badge" => DateTime.diff(now, publish_begin_at) < @seven_days_in_seconds,
        "new_episode_badge" => content_update_at_diff && content_update_at_diff < @seven_days_in_seconds || false,
        "is_recommended" => is_recommended_work,
        "update_at" => content_update_at
      }
      sort_by = {content_update_at, title_kana}
      {response, sort_by}
    end)
    |> Enum.sort_by(&elem(&1, 1), &work_sorter/2)
    |> Enum.map(&elem(&1, 0))
  end

  defp get_content_update_at_info(nil, _now), do: {nil, nil}

  defp get_content_update_at_info(%{update_at: n_update_at}, now) do
    update_at =
      DateTime.from_naive!(n_update_at, "Etc/UTC")
      |> DateTime.truncate(:second)

    get_begin_at_diff(update_at, now)
  end

  defp get_begin_at_diff(datetime, now) do
    {DateTime.diff(now, datetime), datetime}
  end

  defp is_recommended(%{id: recommended_id}, recommended_id), do: true
  defp is_recommended(%{id: _id}, _recommended_id), do: false

  defp work_sorter({updated_at1, title1}, {updated_at2, title2}) do
    case {compare_updated_at(updated_at1, updated_at2), title1 >= title2} do
      {:lt, _}    -> false
      {:eq, true} -> false
      _           -> true
    end
  end

  defp compare_updated_at(nil, nil), do: :eq
  defp compare_updated_at(nil, %DateTime{}), do: :lt
  defp compare_updated_at(%DateTime{}, nil), do: :gt
  defp compare_updated_at(updated_at1, updated_at2), do: DateTime.compare(updated_at1, updated_at2)
end
