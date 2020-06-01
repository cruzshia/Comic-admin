defmodule RaiseServer.Controller.App.V1.Free.Periodical.ShowTest do
  use RaiseServer.RepoCase
  import RaiseServer.FreePeriodicalData

  alias RaiseServer.{Utils, AppsFactory, DepotFactory, AccountFactory}

  @path "/api/app/v1/free/periodical"

  describe "show/1" do
    setup do
      app = AppsFactory.insert(:app)
      %{id: user_id} = AccountFactory.insert(:user)
      device = AccountFactory.insert(:device, %{user_id: user_id})
      now = DateTime.utc_now()
      api_token = Utils.create_api_token(device, now)
      [app: app, header: %{ "x-raise-aid" => app.app_id_token, "x-raise-api-token" => api_token}]
    end

    test "returns free_periodical", ctx do
      %{app: app, header: header} = ctx
      utc_now = DateTime.utc_now() |> DateTime.truncate(:second)

      author1 = DepotFactory.insert(:author, %{name: "Qoo"})
      author2 = DepotFactory.insert(:author, %{name: "Zoo"})

      work1 = DepotFactory.insert(:work, %{free_periodical_day_of_the_week: "月|水", publish_begin_at: utc_now})
      work2 = DepotFactory.insert(:work, %{free_periodical_day_of_the_week: "火"})

      content1 = DepotFactory.insert(:content, %{work_id: work1.id, publish_begin_at: utc_now})

      DepotFactory.insert(:content_app, %{content_id: content1.id, app_id: app.id})

      DepotFactory.insert(:work_app, %{work_id: work1.id, app_id: app.id})
      DepotFactory.insert(:work_app, %{work_id: work2.id, app_id: app.id})

      DepotFactory.insert(:work_author, %{work_id: work1.id, author_id: author1.id})
      DepotFactory.insert(:work_author, %{work_id: work2.id, author_id: author2.id})

      AppsFactory.insert(:app_screen_setting, %{
        app_id: app.id,
        screen: :free_periodical,
        setting: app_screen_setting_json_str(work1.id)
      })

      assert %{status: 200, body: body} = Req.get(@path, header)

      mon_wed_id = "ew#{work1.id}"
      mon_wed_title = work1.title
      mon_wed_author = %{"name" => author1.name, "name_kana" => author1.name_kana}
      tuesday_id = "ew#{work2.id}"
      tuesday_title = work2.title
      tuesday_author = %{"name" => author2.name, "name_kana" => author2.name_kana}

      assert %{
        "monday" => [
          %{
            "id" => ^mon_wed_id,
            "title" => ^mon_wed_title,
            "authors" => [^mon_wed_author],
            "new_rensai_badge" => true,
            "new_episode_badge" => true,
            "is_recommended" => true,
            "update_at" => _,
            "image" => %{
              "url" => _,
              "width" => _,
              "height" => _
            }
          }
        ],
        "tuesday" => [
          %{
            "id" => ^tuesday_id,
            "title" => ^tuesday_title,
            "authors" => [^tuesday_author],
            "new_rensai_badge" => false,
            "new_episode_badge" => false,
            "is_recommended" => false,
            "update_at" => _,
            "image" => %{
              "url" => _,
              "width" => _,
              "height" => _
            }
          }
        ],
        "wednesday" => [
          %{
            "id" => ^mon_wed_id,
            "title" => ^mon_wed_title,
            "authors" => [^mon_wed_author],
            "new_rensai_badge" => true,
            "new_episode_badge" => true,
            "is_recommended" => false,
            "update_at" => _,
            "image" => %{
              "url" => _,
              "width" => _,
              "height" => _
            }
          }
        ],
        "thursday" => [],
        "friday" => [],
        "saturday" => [],
        "sunday" => [],
        "other" => []
      } = Jason.decode!(body)
    end

    test "returns ResourceNotFound if the screen free_periodical is nothing", ctx do
      %{header: header} = ctx

      res = Req.get(@path, header)
      assert_error(res, RaiseServer.Error.ResourceNotFound.new())
    end
  end
end
