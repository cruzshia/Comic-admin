defmodule RaiseServer.SectionBuilder.FreePeriodicalTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory}
  alias RaiseServer.SectionBuilder.FreePeriodical

  describe "process/4" do
    setup do
      app = AppsFactory.insert(:app)
      [app: app]
    end

    test "generate works according to the day of week and ordering", %{app: app} do
      now = DateTime.utc_now() |> DateTime.truncate(:second)
      seven_day_ago = DateTime.add(now, -(60 * 60 * 24 * 7))
      content_begin_at = DateTime.add(now, -(60 * 60 * 24 * 4))
      future_begin_at = DateTime.add(now, 60 * 60)

      author1 = DepotFactory.insert(:author, %{name: "Qoo"})
      author2 = DepotFactory.insert(:author, %{name: "Zoo"})

      work1 = DepotFactory.insert(
        :work,
        %{
          free_periodical_day_of_the_week: "月|水",
          title: "あ",
          title_kana: "ア",
          publish_begin_at: now
        }
      )
      work2 = DepotFactory.insert(
        :work,
        %{
          free_periodical_day_of_the_week: "月",
          title: "い",
          title_kana: "イ",
          publish_begin_at: seven_day_ago
        }
      )
      work3 = DepotFactory.insert(
        :work,
        %{
          free_periodical_day_of_the_week: "月",
          publish_begin_at: seven_day_ago
        }
      )

      content1 = DepotFactory.insert(
        :content,
        %{work_id: work1.id, free_ppv_period1_begin_at: content_begin_at}
      )
      content2 = DepotFactory.insert(
        :content,
        %{work_id: work2.id, free_ppv_period2_begin_at: content_begin_at}
      )
      content3 = DepotFactory.insert(
        :content,
        %{work_id: work3.id, publish_begin_at: seven_day_ago, free_ppv_period1_begin_at: future_begin_at}
      )

      DepotFactory.insert(:content_app, %{content_id: content1.id, app_id: app.id})
      DepotFactory.insert(:content_app, %{content_id: content2.id, app_id: app.id})
      DepotFactory.insert(:content_app, %{content_id: content3.id, app_id: app.id})

      DepotFactory.insert(:work_app, %{work_id: work1.id, app_id: app.id})
      DepotFactory.insert(:work_app, %{work_id: work2.id, app_id: app.id})
      DepotFactory.insert(:work_app, %{work_id: work3.id, app_id: app.id})

      DepotFactory.insert(:work_author, %{work_id: work1.id, author_id: author1.id})
      DepotFactory.insert(:work_author, %{work_id: work2.id, author_id: author2.id})
      DepotFactory.insert(:work_author, %{work_id: work3.id, author_id: author2.id})

      day_of_week = "月"
      prefix_recommended_work_id = "ew#{work1.id}"

      work1_id = "ew#{work1.id}"
      work2_id = "ew#{work2.id}"
      work3_id = "ew#{work3.id}"

      work1_title = work1.title
      work2_title = work2.title
      work3_title = work3.title

      work1_author = %{"name" => author1.name, "name_kana" => author1.name_kana}
      work2_author = %{"name" => author2.name, "name_kana" => author2.name_kana}
      work3_author = %{"name" => author2.name, "name_kana" => author2.name_kana}

      works = FreePeriodical.process(app.id, now, day_of_week, prefix_recommended_work_id)

      assert [
        %{
          "id" => ^work1_id,
          "title" => ^work1_title,
          "authors" => [^work1_author],
          "is_recommended" => true,
          "new_rensai_badge" => true,
          "new_episode_badge" => true,
          "update_at" => ^content_begin_at,
          "image" => %{
            url: _,
            width: _,
            height: _
          }
        },
        %{
          "id" => ^work2_id,
          "title" => ^work2_title,
          "authors" => [^work2_author],
          "is_recommended" => false,
          "new_rensai_badge" => false,
          "new_episode_badge" => true,
          "update_at" => ^content_begin_at,
          "image" => %{
            url: _,
            width: _,
            height: _
          }
        },
        %{
          "id" => ^work3_id,
          "title" => ^work3_title,
          "authors" => [^work3_author],
          "is_recommended" => false,
          "new_rensai_badge" => false,
          "new_episode_badge" => false,
          "update_at" => ^seven_day_ago,
          "image" => %{
            url: _,
            width: _,
            height: _
          }
        }
      ] = works
    end
  end
end
