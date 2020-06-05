defmodule RaiseServer.Controller.Console.V1.Works.DetailTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory}

  @path "/api/console/v1/works/"

  describe "get/1" do
    setup do
      [header: %{ "x-raise-api-token" => "api_token"}]
    end

    test "returns work_detail", ctx do
      %{header: header} = ctx

      app1 = AppsFactory.insert(:app, %{name: "app1"})
      app2 = AppsFactory.insert(:app, %{name: "app2", app_id_token: "app2_token"})

      author1 = DepotFactory.insert(:author, %{name: "Qoo"})
      author2 = DepotFactory.insert(:author, %{name: "Zoo"})

      subscription = DepotFactory.insert(:subscription)

      work = DepotFactory.insert(:work, %{subscription_id: subscription.id, free_periodical_day_of_the_week: "月|水"})
      work_id = "ew#{work.id}"

      DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app1.id})
      DepotFactory.insert(:work_app, %{work_id: work.id, app_id: app2.id})

      DepotFactory.insert(:work_author, %{work_id: work.id, author_id: author1.id})
      DepotFactory.insert(:work_author, %{work_id: work.id, author_id: author2.id})

      [ads_in_viewer_setting | _] = work.ads_in_viewer_setting
      front_ads =
        Enum.map(ads_in_viewer_setting.front_ads, fn fa ->
          fa
          |> Map.from_struct()
          |> Enum.reject(fn {_, v} -> is_nil(v)end)
          |> Map.new()
        end)
      back_ads =
        Enum.map(ads_in_viewer_setting.back_ads, fn ba ->
          ba
          |> Map.from_struct()
          |> Enum.reject(fn {_, v} -> is_nil(v)end)
          |> Map.new()
        end)
      formated_images =
        work.images
        |> Map.from_struct()
        |> Enum.map(fn {k, v} ->
             {k, %{url: "https://" <> "" <> "/" <> v.path, width: v.width, height: v.height}}
           end)
        |> Map.new()
      expect = %{
        id:                              work_id,
        title:                           work.title,
        title_kana:                      work.title_kana,
        work_type:                       "episode",
        inserted_at:                     work.inserted_at,
        updated_at:                      work.updated_at,
        episode_work_type:               "one_shot",
        update_frequency:                work.update_frequency,
        images:                          formated_images,
        apps: [
          %{id: app1.id, name: app1.name},
          %{id: app2.id, name: app2.name},
        ],
        subscription:                    %{id: subscription.id, name: subscription.name},
        authors: [
          %{id: author1.id, name: author1.name},
          %{id: author2.id, name: author2.name},
        ],
        description:                     work.description,
        publish_begin_at:                work.publish_begin_at,
        publish_end_at:                  work.publish_end_at,
        free_periodical_day_of_the_week: work.free_periodical_day_of_the_week,
        return_ad_revenue:               work.return_ad_revenue,
        ads_in_viewer_setting: [
          %{
            device: ads_in_viewer_setting.device,
            front_ads: front_ads,
            back_ads: back_ads,
          },
        ],
      } |> Jason.encode!()
      assert %{status: 200, body: body} = Req.get(@path <> work_id, header)

      assert expect == body
    end

    test "returns ResourceNotFound if the work_id does not exist", ctx do
      %{header: header} = ctx

      res = Req.get(@path <> "ew111", header)
      assert_error(res, RaiseServer.Error.ResourceNotFound.new())
    end
    test "returns BadRequest if the format of work_id is invalid", ctx do
      %{header: header} = ctx

      Enum.each([
        "ea111",
        "ea",
        "ewaaa",
        "",
      ], fn work_id ->
        res = Req.get(@path <> work_id, header)
        assert_error(res, RaiseServer.Error.BadRequest.new())
      end)
    end
  end
end
