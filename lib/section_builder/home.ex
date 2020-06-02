use Croma

defmodule RaiseServer.SectionBuilder.Home do

  alias RaiseServer.{Depot, SectionBuilder}
  alias SectionBuilder.Utils

  @seven_days_in_seconds 604_800

  defun process(app_id :: integer, now :: DateTime.t, settings :: map) :: map do
    {_, response} = Map.get_and_update(settings, "sections", fn sections ->
      {sections, Enum.map(sections, &process_section(&1, app_id, now))}
    end)
    response
  end

  defunpt process_section(section :: map, app_id :: integer, now :: DateTime.t) :: map do
    do_process_section(section, app_id, now)
  end

  # TODO Create one function per section
  defp do_process_section(%{"type" => "daily_ranking"} = section, app_id, now) do
    query_filters = [
      excluded_in_todays_ranking: false,
      published_period: now
    ]

    query_options = [
      join: [work_for_home_daily_ranking: ~w/original one_shot sample/],
      preload: [:content_assessment],
      distinct: [:work_id],
      order_by: [desc: :publish_begin_at]
    ]

    day_of_week_grouper = fn cont ->
      cont.publish_begin_at |> DateTime.to_date() |> Date.day_of_week()
    end

    Depot.get_contents(app_id, query_filters, query_options)
    |> Enum.group_by(day_of_week_grouper, fn cont ->
      response = %{
        "title" => cont.name,
        "action_url" => "jumpplus://works/ew#{cont.work_id}",
        "landscape_image" => cont.work.images.image1,
        "square_image" => cont.work.images.image2,
        "comment_count" => cont.content_assessment.comment_count,
        "view_count" => cont.content_assessment.view_count,

        # TODO pending spec
        "badge" => "",
        "rookie_badge" => false
      }

      sort_conditions = %{
        view_count: cont.content_assessment.view_count,
        episode_type: cont.work.episode_work_type,
        name_kana: cont.name_kana,
      }

      {response, sort_conditions}
    end)
    |> Enum.reduce(section, fn {day, work_pairs}, acc ->
      works =
        Enum.sort_by(work_pairs, & elem(&1, 1), &daily_ranking_sorter/2)
        |> Enum.map(& elem(&1, 0))

      put_in(acc, ["daily_rankings", day_of_week_str(day), "works"], works)
    end)
  end

  defp do_process_section(%{"type" => "free_only_now"} = section, app_id, now) do
    works =
      Depot.get_work_campaigns(app_id, [campaign_period: now],
        order_by: [asc: :end_at, asc: :id],
        limit: 6,
        preload: [:work]
      )
      |> Enum.map(fn %{free_range_display_string: free_range_display_string, end_at: end_at, work: work} ->
        %{
          action_url: "jumpplus://works/#{Utils.add_resource_prefix(work)}",
          image: Utils.format_image(work.images.image1),
          title: work.title,
          free_range_display_string: free_range_display_string,
          end_date: end_at,
        }
      end)

    section
    |> Map.put("works", works)
  end

  defp do_process_section(%{"type" => "ranking", "rankings" => rankings} = section, _app_id, _now) do
    # TODO: Call api for real data
    processed_rankings =
      Enum.map(rankings, fn %{"ranking_type" => _ranking_type} = ranking ->
        works = [
          %{
            "action_url" => "jumpplus://works/ew1",
            "comment_count" => 500,
            "description" => "そこはありふれた生徒会。美しい生徒会長と、会長を支える補佐の青年。 そしてもう一人、会長を狙う野獣がいたが…何と女!?百合ギャグの名手による新作コメディ！",
            "image" => %{
                "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/356/image4s/original/852103b7b8296663fc2fe849e21d2224.jpg",
                "width" => 240,
                "height" => 240
            },
            "new_episode_badge" => true,
            "title" => "あぁ我が青春よ！",
            "view_count" => 586_774
          },
          %{
            "action_url" => "jumpplus://works/ew2",
            "comment_count" => 400,
            "description" => "そこはありふれた生徒会。美しい生徒会長と、会長を支える補佐の青年。 そしてもう一人、会長を狙う野獣がいたが…何と女!?百合ギャグの名手による新作コメディ！",
            "image" => %{
                "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/356/image4s/original/852103b7b8296663fc2fe849e21d2224.jpg",
                "width" => 240,
                "height" => 240
            },
            "new_episode_badge" => true,
            "title" => "あぁ我が青春よ！",
            "view_count" => 586_773
          },
          %{
            "action_url" => "jumpplus://works/ew3",
            "comment_count" => 300,
            "description" => "そこはありふれた生徒会。美しい生徒会長と、会長を支える補佐の青年。 そしてもう一人、会長を狙う野獣がいたが…何と女!?百合ギャグの名手による新作コメディ！",
            "image" => %{
                "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/356/image4s/original/852103b7b8296663fc2fe849e21d2224.jpg",
                "width" => 240,
                "height" => 240
            },
            "new_episode_badge" => true,
            "title" => "あぁ我が青春よ！",
            "view_count" => 586_772
          },
          %{
            "action_url" => "jumpplus://works/ew4",
            "comment_count" => 200,
            "description" => "そこはありふれた生徒会。美しい生徒会長と、会長を支える補佐の青年。 そしてもう一人、会長を狙う野獣がいたが…何と女!?百合ギャグの名手による新作コメディ！",
            "image" => %{
                "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/356/image4s/original/852103b7b8296663fc2fe849e21d2224.jpg",
                "width" => 240,
                "height" => 240
            },
            "new_episode_badge" => true,
            "title" => "あぁ我が青春よ！",
            "view_count" => 586_771
          },
          %{
            "action_url" => "jumpplus://works/ew5",
            "comment_count" => 100,
            "description" => "そこはありふれた生徒会。美しい生徒会長と、会長を支える補佐の青年。 そしてもう一人、会長を狙う野獣がいたが…何と女!?百合ギャグの名手による新作コメディ！",
            "image" => %{
                "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/356/image4s/original/852103b7b8296663fc2fe849e21d2224.jpg",
                "width" => 240,
                "height" => 240
            },
            "new_episode_badge" => true,
            "title" => "あぁ我が青春よ！",
            "view_count" => 586_770
          },
        ]
        Map.put(ranking, "works", works)
      end)
    Map.put(section, "rankings", processed_rankings)
  end

  defp do_process_section(%{"type" => "works", "work_ids" => work_ids, "title" => title}, app_id, now) do
    new_work_ids = ids_to_int(work_ids)
    works = Depot.get_works(app_id, [id: new_work_ids])
    |> Enum.map(fn %{images: images, title: title, publish_begin_at: publish_begin_at} = work ->
      %{
        action_url: "jumpplus://works/#{Utils.add_resource_prefix(work)}",
        image: images.image1,
        title: title,
        new_episode_badge: DateTime.diff(now, publish_begin_at) < @seven_days_in_seconds
      }
    end)
    %{
      type: "works",
      title: title,
      works: works
    }
  end

  defp do_process_section(%{"type" => "rookie_ranking"} = section, _app_id, _now) do
    # TODO: Call HaTeNa api for real data
    works = [
      %{
        "action_url" => "https://rookie.shonenjump.com/series/X1vJnKYdvHc",
        "image"      => %{
          "url"      => "https://cdn-img.rookie.shonenjump.com/public/cover_images/6871307331122892003-31ac184c60bc",
          "width"    => 403,
          "height"   => 403,
        },
        "title"      => "LONG JUMP",
      },
      %{
        "action_url" => "https://rookie.shonenjump.com/series/X1vJnKYc7QE",
        "image"      => %{
          "url"      => "https://cdn-img.rookie.shonenjump.com/public/cover_images/6871307331122892003-31ac184c60bc",
          "width"    => 403,
          "height"   => 403,
        },
        "title"      => "何も感じなくなる前に",
      }
    ]
    Map.put(section, "works", works)
  end

  defp do_process_section(%{"type" => "rookie_pickup"} = section, _app_id, _now) do
    # TODO: Call HaTeNa api for real data
    works = [
      %{
        "action_url" => "https://rookie.shonenjump.com/series/X1vJnKYdvHc",
        "image"      => %{
          "url"      => "https://cdn-img.rookie.shonenjump.com/public/cover_images/6871307331122892003-31ac184c60bc",
          "width"    => 403,
          "height"   => 403,
        },
        "title"      => "LONG JUMP",
      },
      %{
        "action_url" => "https://rookie.shonenjump.com/series/X1vJnKYc7QE",
        "image"      => %{
          "url"      => "https://cdn-img.rookie.shonenjump.com/public/cover_images/6871307331122892003-31ac184c60bc",
          "width"    => 403,
          "height"   => 403,
        },
        "title"      => "何も感じなくなる前に",
      },
    ]
    Map.put(section, "works", works)
  end

  defp do_process_section(%{"type" => "books", "content_ids" => content_ids} = section, app_id, now) do
    int_content_ids = ids_to_int(content_ids)
    contents =
      Depot.get_contents(app_id, [id: int_content_ids, published_period: now], select: [:id, :name, :content_type, :thumbnail_image])
      |> Enum.map(fn %{name: name, thumbnail_image: thumbnail_image} = content ->
        %{
          id: Utils.add_resource_prefix(content),
          name: name,
          content_type: content.content_type |> Utils.translate_english_to_japanese(),
          image: Utils.format_image(thumbnail_image),
        }
      end)
    section
    |> Map.put("contents", contents)
    |> Map.delete("content_ids")
  end

  defp do_process_section(%{"type" => "subscription"} = section, app_id, now) do
    %{"subscription_id" => <<_ :: binary-size(2)>> <> sub_id_str} = section
    sub_id = String.to_integer(sub_id_str)

    %{contents: [content]} = Depot.get_work(
      app_id,
      [subscription_id: sub_id, is_main_work_of_subscription: true, published_period: now],
      [preload: [newest_content: {app_id, now}]]
    )

    Map.put_new(section, "latest_content", %{
      "id" => Utils.add_resource_prefix(content),
      "image" => Utils.format_image(content.thumbnail_image)
    })
  end

  defp do_process_section(section, _app_id, _now) do
    section
  end

  defp ids_to_int(ids) do
    Enum.reduce(ids, [], fn id, acc ->
      <<_prefix :: binary-size(2), str_id :: binary>> = id
      case Integer.parse(str_id) do
        {id, _} -> [id | acc]
        _       -> acc
      end
    end)
    |> Enum.reverse()
  end

  defp day_of_week_str(1), do: "monday"
  defp day_of_week_str(2), do: "tuesday"
  defp day_of_week_str(3), do: "wednesday"
  defp day_of_week_str(4), do: "thursday"
  defp day_of_week_str(5), do: "friday"
  defp day_of_week_str(6), do: "saturday"
  defp day_of_week_str(7), do: "sunday"

  defp daily_ranking_sorter(work1, work2) do
    work1_episode_type = Keyword.get(RaiseServer.EpisodeTypeEnum.__enum_map__(), work1.episode_type)
    work2_episode_type = Keyword.get(RaiseServer.EpisodeTypeEnum.__enum_map__(), work2.episode_type)

    cond do
      work1.view_count >= work2.view_count -> true
      work1_episode_type <= work2_episode_type -> true
      work1.name_kana <= work2.name_kana -> true
    end
  end
end
