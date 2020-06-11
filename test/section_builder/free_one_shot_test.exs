defmodule RaiseServer.SectionBuilder.FreeOneShotTest do
  use RaiseServer.RepoCase

  alias RaiseServer.{AppsFactory, DepotFactory, SectionBuilder}
  alias SectionBuilder.FreeOneShot

  describe "process/3" do
    test "produces output for free one shot page" do
      screen = AppsFactory.insert(:free_one_shot_screen, setting: "{}")
      {count, sample_contents} = insert_sample_contents(screen, 6)

      assert %{"total_count" => ^count, "works" => works} =
        FreeOneShot.process(screen.app_id, DateTime.utc_now, :jsx.decode(screen.setting, return_maps: true), [limit: 3, offset: 1])

      assert Enum.count(works) == 3

      result_pairs =
        for work <- works do
          %{"id" => "ew" <> work_id, "publish_begin_at" => begin_at} = work

          assert Map.keys(work) ==
            ~w/authors id image is_recommended new_arrival_badge publish_begin_at title/

          {work_id, begin_at}
        end

      assert result_pairs ==
        Enum.map( sample_contents, &{to_string(&1.work_id), &1.publish_begin_at})
        |> Enum.sort_by(&elem(&1, 1) |> DateTime.to_unix, &>=/2)
        |> List.delete_at(0)
        |> Enum.take(3)
    end

    test "recommended work is first in the list of works fetched from DB" do
      app = AppsFactory.insert(:app)

      work = DepotFactory.insert(:episode_work, episode_work_type: :one_shot)
      DepotFactory.insert(:work_app, work: work, app: app)
      DepotFactory.insert(:content_app, app: app, content: DepotFactory.build(:content, work: work))

      screen = AppsFactory.insert(:free_one_shot_screen, app: app, setting: "{'recommended_work_id': 'ew#{work.id}'}")

      {count, _} = insert_sample_contents(screen, 6)

      work_id_str = to_string(work.id)
      count_1 = count + 1

      assert %{"total_count" => ^count_1, "works" => [res_work | _]} =
        FreeOneShot.process(app.id, DateTime.utc_now, :jsx.decode(screen.setting, return_maps: true), [limit: 3, offset: 0])

      assert %{"is_recommended" => true, "id" => "ew" <> ^work_id_str } = res_work

      %{"works" => [%{"id" => str_id} | _]} =
        FreeOneShot.process(app.id, DateTime.utc_now, :jsx.decode(screen.setting, return_maps: true), [limit: 3, offset: 3])

      refute str_id == "ew" <> work_id_str
    end
  end

  defp insert_sample_contents(app_screen, count) do
    contents = DepotFactory.insert_list(count, :episode_work, episode_work_type: :one_shot)
    |> Enum.with_index()
    |> Enum.map(fn {work, offset} ->
      DepotFactory.insert(:work_app, work: work, app: app_screen.app)
      begin_at = DateTime.utc_now |> DateTime.add(-3600 * 24 * offset, :second)
      content = DepotFactory.build(:content, work: work, publish_begin_at: begin_at)
      content_app = DepotFactory.insert(:content_app, app: app_screen.app, content: content)
      content_app.content
    end)

    {count, contents}
  end
end
