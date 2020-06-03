use Croma

defmodule RaiseServer.Curation do
  import Ecto.Query

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.Curation.WorkTag

  defun get_ranking_work_ids(ranking_type :: v[String.t], _opts :: v[list] \\ []) :: [String.t] do
    WorkTag
    |> join(:inner, [wt], t in assoc(wt, :tag), on: t.name == ^ranking_type and wt.tag_group == "ranking")
    |> order_by([asc: :sort_code])
    |> select([wt], wt.work_id)
    |> limit(5)
    |> Repo.all()
  end
end
