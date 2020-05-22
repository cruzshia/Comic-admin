use Croma

defmodule RaiseServer.SectionBuilder do

  alias RaiseServer.{Apps, Depot, SectionBuilder}
  alias SectionBuilder.Utils

  @seven_days_in_seconds 604_800

  def generate(app_id, now, page) do
    case Apps.get_page_setting(app_id, page) do
      %{"sections" => sections} ->
        %{"sections" => Enum.map(sections, &process_section(&1, app_id, now, page))}
      nil ->
        nil
    end
  end

  # TODO Create one function per section
  def process_section(%{"type" => "daily_ranking", "daily_rankings" => daily_rankings} = section, _app_id, _now, _page) do
    daily_ranking_data =
      Enum.map(daily_rankings, fn {week_day, origin_data} ->
        # TODO: get ranking work list for each week day ranking
        works = [
          %{
            "action_url" => "jumpplus://works/ew1",
            "comment_count" => 25_377,
            "landscape_image" => %{
              "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/26/landscape_images/original/2215982f36969ac8812d503d6ace99a6.jpg",
              "width" => 750,
              "height" => 360
            },
            "square_image" => %{
              "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/26/image4s/original/84c7c90c6df1c36840d89e019a3e429d.jpg",
              "width" => 380,
              "height" => 380
            },
            "title" => "悪魔のメムメムちゃん",
            "view_count" => 38_345_882,
            "badge" => "new_rensai",
            "rookie_badge" => false
          },
          %{
            "action_url" => "jumpplus://works/ew2",
            "comment_count" => 124_720,
            "landscape_image" => %{
              "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/121/landscape_images/original/c0ef4f825359163e7612caee86d29fb3.jpg",
              "width" => 750,
              "height" => 360
            },
            "square_image" => %{
              "url" => "https://delivery.demo.raise.access-dpe.com/production/image/works/121/image4s/original/8e92de9bdf91e4f2929a3afc8a1518f7.jpg",
              "width" => 380,
              "height" => 380
            },
            "title" => "猫田びより",
            "view_count" => 154_805_248,
            "rookie_badge" => false
          }
        ]
        %{"#{week_day}" => Map.put(origin_data, "works", works)}
      end)
    Map.put(section, "daily_rankings", daily_ranking_data)
  end

  def process_section(%{"type" => "free_only_now"} = section, app_id, now, _page) do
    works =
      Depot.get_work_campaigns(app_id, now,
        order_by: [asc: :end_at, asc: :id],
        limit: 6,
        preload: [:work]
      )
      |> Enum.map(fn %{free_range_display_string: free_range_display_string, end_at: end_at, work: work} ->
        %{
          action_url: "jumpplus://works/#{Utils.add_resource_prefix(work)}",
          image: work.images.image1,
          title: work.title,
          free_range_display_string: free_range_display_string,
          end_date: end_at,
        }
      end)

    section
    |> Map.put("works", works)
  end

  def process_section(%{"type" => "ranking", "rankings" => rankings} = section, _app_id, _now, _page) do
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

  def process_section(%{"type" => "works", "work_ids" => work_ids, "title" => title}, app_id, now, _page) do
    new_work_ids = ids_to_int(work_ids)
    works = Depot.get_works(app_id, new_work_ids, [time: now])
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

  def process_section(%{"type" => "rookie_ranking"} = section, _app_id, _now, _page) do
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

  def process_section(%{"type" => "rookie_pickup"} = section, _app_id, _now, _page) do
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

  def process_section(%{"type" => "books", "content_ids" => content_ids} = section, app_id, now, _page) do
    int_content_ids = ids_to_int(content_ids)
    contents =
      Depot.get_contents(app_id, int_content_ids, [select: [:id, :name, :content_type, :thumbnail_image], time: now])
      |> Enum.map(fn %{name: name, thumbnail_image: thumbnail_image} = content ->
        %{
          id: Utils.add_resource_prefix(content),
          name: name,
          content_type: content.content_type |> Utils.translate_english_to_japanese(),
          image: thumbnail_image,
        }
      end)
    section
    |> Map.put("contents", contents)
    |> Map.delete("content_ids")
  end

  def process_section(%{"type" => "subscription"} = section, app_id, now, _) do
    %{"subscription_id" => <<_ :: binary-size(2)>> <> sub_id_str} = section
    sub_id = String.to_integer(sub_id_str)

    %{contents: [content]} = Depot.get_work(
      app_id,
      [subscription_id: sub_id, is_main_work_of_subscription: true, time: now],
      preload: [:newest_content]
    )

    Map.put_new(section, "latest_content", %{
      "id" => Utils.add_resource_prefix(content),
      "image" => content.thumbnail_image |> Map.delete(:__struct__)
    })
  end

  def process_section(section, _app_id, _now, _page) do
    section
  end

  defunp ids_to_int(ids :: v[[String.t]]) :: [integer] do
    Enum.reduce(ids, [], fn id, acc ->
      <<_prefix :: binary-size(2), str_id :: binary>> = id
      case Integer.parse(str_id) do
        {id, _} -> [id | acc]
        _       -> acc
      end
    end)
    |> Enum.reverse()
  end
end
