use Croma

defmodule RaiseServer.SectionBuilder.FreeOnlyNow do

  alias RaiseServer.Depot
  alias RaiseServer.SectionBuilder.Utils

  @seven_days_in_seconds 604_800

  defun process_sections(app_id :: v[integer], now :: DateTime.t, %{"sections" => sections} = only_now_setting :: v[map]) :: map do
    %{only_now_setting |
      "sections" => Enum.map(sections, &process(&1, app_id, now))
    }
  end

  defp process(%{"type" => "limited_time_free"} = section, _app_id, _now) do
    # TODO: Get limited_time_free work list
    works = [
      %{
        "id" => "ew1",
        "title" => "LONG JUMP",
        "image" => %{
          "url" => "https://cdn-img.rookie.shonenjump.com/public/cover_images/6871307331122892003-31ac184c60bc",
          "width" => 403,
          "height" => 403
        },
        "update_display_string" => "第10話更新"
      },
      %{
        "id" => "ew2",
        "title" => "終わりのパンダ",
        "image" => %{
          "url" => "https://delivery.store007-access-company.com/works/2012/image4s/original/3d0ef38c3421567973791d42814fc7f0.jpg",
          "width" => 380,
          "height" => 380
        },
        "update_display_string" => "第30話更新"
      },
      %{
        "id" => "ew3",
        "title" => "悪魔のメムメムちゃん",
        "image" => %{
          "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/26/image4s/original/84c7c90c6df1c36840d89e019a3e429d.jpg",
          "width" => 380,
          "height" => 380
        },
        "update_display_string" => "第15話更新"
      },
      %{
        "id" => "ew4",
        "title" => "べしゃり暮らし",
        "image" => %{
          "url" => "https://delivery.dev.raise.access-dpe.com/public/test_data/production/image/works/1000/images/original/662be4c9ca65e086a73ae0779776220d.jpg",
          "width" => 240,
          "height" => 240
        },
        "update_display_string" => "第20話更新"
      },
      %{
        "id" => "ew5",
        "title" => "僕と君の間に",
        "image" => %{
          "url" => "https://delivery.dev.raise.access-dpe.com/public/test_data/production/image/works/1045/images/original/85703928191665c0686f8805951f878c.jpg",
          "width" => 240,
          "height" => 240
        },
        "update_display_string" => "第17話更新"
      }
    ]

    Map.put(section, "works", works)
  end

  defp process(%{"type" => "read_in_one_go", "recommended_work_id" => recommended_work_id_str} = section, app_id, now) do
    # TODO: Fix the sort condition
    recommended_work_id = Utils.parse_resource_prefix(recommended_work_id_str)
    works =
      Depot.get_work_campaigns(app_id, [campaign_period: now], order_by: [asc: :end_at, asc: :id], preload: [:work])
      |> Enum.map(fn work_campaign ->
        build_read_in_one_go_response(work_campaign, recommended_work_id, now)
      end)
      |> Enum.sort_by(&elem(&1, 1), &work_sorter/2)
      |> Enum.map(&elem(&1, 0))

    Map.delete(section, "recommended_work_id")
    |> Map.put("works", works)
  end

  defp process(%{"type" => "limited_time_free_comic", "content_ids" => content_ids} = section, app_id, now) do
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

  defp build_read_in_one_go_response(work_campaign, recommended_work_id, now) do
    %{
      end_at: end_at,
      free_range_display_string: free_range_display_string,
      work: %{id: id, images: images, title: title, updated_at: updated_at, publish_begin_at: publish_begin_at} = work,
    } = work_campaign
    response = %{
      "id" => Utils.add_resource_prefix(work),
      "title"  => title,
      "image" => Utils.format_image(images.image1),
      "end_at" => end_at,
      "new_rensai_badge" => DateTime.diff(now, publish_begin_at) < @seven_days_in_seconds,
      "is_recommended" => recommended_work_id == id,
      "free_range_display_string" => free_range_display_string,
    }
    sort_by = {updated_at, title}
    {response, sort_by}
  end

  defp work_sorter({updated_at1, tilte1}, {updated_at2, tilte2}) do
    cond do
      DateTime.compare(updated_at2, updated_at1) == :gt -> false
      tilte2 <= tilte1 -> false
      true -> true
    end
  end
end
