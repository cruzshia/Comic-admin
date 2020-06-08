use Croma

defmodule RaiseServer.Depot do
  import Ecto.Query

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.{Depot, EctoQueryMaker}
  alias Depot.{WorkCampaign, Work, Content, WorkQuery, ContentQuery, WorkCampaignQuery}

  @doc """
  get Work records from db
  """
  defun get_works(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: [Work.t] do
    Work
    |> filter_by_app_id(:work_apps, app_id)
    |> EctoQueryMaker.apply(WorkQuery, filters, opts)
    |> Repo.all()
  end

  defun count_works(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: integer do
    Work
    |> filter_by_app_id(:work_apps, app_id)
    |> EctoQueryMaker.apply(WorkQuery, filters, opts)
    |> select(count())
    |> Repo.one()
  end

  defun get_contents(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: [Content.t] do
    Content
    |> filter_by_app_id(:content_apps, app_id)
    |> EctoQueryMaker.apply(ContentQuery, filters, opts)
    |> Repo.all()
  end

  defun get_work_campaigns(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: [WorkCampaign.t] do
    WorkCampaign
    |> filter_by_app_id(:work_campaign_apps, app_id)
    |> EctoQueryMaker.apply(WorkCampaignQuery, filters, opts)
    |> Repo.all()
  end

  @doc """
  get a Work record from db
  """
  defun get_work(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: Work.t | nil do
    Work
    |> filter_by_app_id(:work_apps, app_id)
    |> EctoQueryMaker.apply(WorkQuery, filters, opts)
    |> limit(1)
    |> Repo.one()
  end

  @doc """
  get a Work record from db without app_id.

  It is used to display the work details from the console screen.
  Do not use for apps.
  """
  defun get_work_for_console(filters :: v[list], opts :: v[list] \\ []) :: Work.t | nil do
    Work
    |> join_apps()
    |> join_authors()
    |> preload([:subscription])
    |> EctoQueryMaker.apply(WorkQuery, filters, opts)
    |> Repo.one()
  end

  defp join_apps(module) do
    module
    |> join(:left, [w], wa in assoc(w, :apps))
    |> preload([..., wa], [apps: wa])
  end

  defp join_authors(module) do
    module
    |> join(:left, [w], wa in assoc(w, :authors))
    |> preload([..., wa], [authors: wa])
  end

  defun filter_by_app_id(query :: Ecto.Queryable.t, assoc_app :: v[atom], app_id :: v[integer]) :: Ecto.Queryable.t do
    query
    |> join(:inner, [r], ra in assoc(r, ^assoc_app))
    |> where([_, ra], ra.app_id == ^app_id)
  end
end
