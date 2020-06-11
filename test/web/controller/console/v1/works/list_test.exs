defmodule RaiseServer.Controller.Console.V1.Works.ListTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory}

  @path "/api/console/v1/works/"
  @dummy_cdn_host RaiseServer.get_env("cdn_host", "")

  describe "get/1" do
    setup do
      [header: %{ "x-raise-api-token" => "api_token"}]
    end

    test "returns work_list", %{header: header} do
      app1 = AppsFactory.insert(:app, %{name: "app1"})
      app2 = AppsFactory.insert(:app, %{name: "app2", app_id_token: "app2_token"})

      author1 = DepotFactory.insert(:author, %{name: "Qoo"})
      author2 = DepotFactory.insert(:author, %{name: "Zoo"})

      subscription = DepotFactory.insert(:subscription, %{name: "subscription1"})

      work1 = DepotFactory.insert(:work, %{subscription: subscription, free_periodical_day_of_the_week: "月|水"})
      work2 = DepotFactory.insert(:work, %{subscription: subscription, free_periodical_day_of_the_week: "月|水"})
      work1_id = "ew#{work1.id}"
      work2_id = "ew#{work2.id}"

      DepotFactory.insert(:work_app, %{work: work1, app: app1})
      DepotFactory.insert(:work_app, %{work: work1, app: app2})
      DepotFactory.insert(:work_app, %{work: work2, app: app1})
      DepotFactory.insert(:work_app, %{work: work2, app: app2})

      DepotFactory.insert(:work_author, %{work: work1, author: author1})
      DepotFactory.insert(:work_author, %{work: work1, author: author2})
      DepotFactory.insert(:work_author, %{work: work2, author: author1})
      DepotFactory.insert(:work_author, %{work: work2, author: author2})

      work1_formatted_images =
        work1.images
        |> Map.from_struct()
        |> Enum.map(fn {k, v} ->
            {k, %{url: "https://" <> @dummy_cdn_host <> "/" <> v.path, width: v.width, height: v.height}}
           end)
        |> Map.new()

      work2_formatted_images =
        work2.images
        |> Map.from_struct()
        |> Enum.map(fn {k, v} ->
            {k, %{url: "https://" <> @dummy_cdn_host <> "/" <> v.path, width: v.width, height: v.height}}
           end)
        |> Map.new()

      expect_base = %{
        total_count: 2,
        works: [
          %{
            id:                work1_id,
            title:             work1.title,
            work_type:         "episode",
            inserted_at:       work1.inserted_at,
            episode_work_type: "one_shot",
            update_frequency:  work1.update_frequency,
            images:            work1_formatted_images,
          },
          %{
            id:                work2_id,
            title:             work2.title,
            work_type:         "episode",
            inserted_at:       work2.inserted_at,
            episode_work_type: "one_shot",
            update_frequency:  work2.update_frequency,
            images:            work2_formatted_images,
          },
      ]}

      [publish_begin_at_from_string, publish_begin_at_to_string] =
        [work1.publish_begin_at, work2.publish_begin_at]
        |> Enum.sort(&(DateTime.compare(&1, &2) == :lt))
        |> Enum.map(&DateTime.to_iso8601/1)
      [publish_end_at_from_string, publish_end_at_to_string] =
        [work1.publish_end_at, work2.publish_end_at]
        |> Enum.sort(&(DateTime.compare(&1, &2) == :lt))
        |> Enum.map(&DateTime.to_iso8601/1)

      for(
        limit_offset <- [
          %{limit: 100, offset: 0},
          %{limit: 1, offset: 0},
          %{limit: 100, offset: 2},
        ],
        query <- [
          %{work_type: "episode"},
          %{app_id: "#{app1.id}"},
          %{app_id: "#{app2.id}"},
          %{subscription_id: "sb#{subscription.id}"},
          %{return_ad_revenue: work1.return_ad_revenue},
          %{update_frequency: work1.update_frequency},
          %{free_periodical_day_of_the_week: work1.free_periodical_day_of_the_week},
          %{magazine_name: work1.magazine_name},
          %{publish_begin_at_from: publish_begin_at_from_string},
          %{publish_begin_at_to: publish_begin_at_to_string},
          %{publish_begin_at_from: publish_begin_at_from_string, publish_begin_at_to: publish_begin_at_to_string},
          %{publish_end_at_from: publish_end_at_from_string},
          %{publish_end_at_to: publish_end_at_to_string},
          %{publish_end_at_from: publish_end_at_from_string, publish_end_at_to: publish_end_at_to_string},
        ]
      ) do
        expect =
          case limit_offset do
            %{limit: 100, offset: 0} ->
              expect_base
            %{limit: 1, offset: 0} ->
              Map.put(expect_base, :works, [hd(expect_base.works)])
            %{limit: 100, offset: 2} ->
              Map.put(expect_base, :works, [])
          end
          |> Jason.encode!()

        query_string = Map.merge(limit_offset, query) |> URI.encode_query()
        assert %{status: 200, body: body} = Req.get(@path <> "?" <> query_string, header)

        assert expect == body
      end
    end

    test "returns empty list when queries do not match", %{header: header} do
      assert %{status: 200, body: body} = Req.get(@path <> "?" <> "work_type=episode", header)

      assert %{"total_count" => 0, "works" => []} == body |> Jason.decode!()
    end

    test "returns BadRequest", %{header: header} do
      Enum.each([
        %{limit: 101, offset: 0},
        %{work_type: "wrong work_type"},
        %{app_id: "aaa"},
        %{subscription_id: "sbaa"},
        %{return_ad_revenue: "original"},
        %{publish_begin_at_from: "wrong datetime string"},
        %{publish_begin_at_to: "wrong datetime string"},
        %{publish_end_at_from: "wrong datetime string"},
        %{publish_end_at_to: "wrong datetime string"},
      ], fn query ->
        res = Req.get(@path <> "?" <> URI.encode_query(query), header)
        assert_error(res, RaiseServer.Error.BadRequest.new())
      end)
    end
  end
end
