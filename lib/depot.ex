use Croma

defmodule RaiseServer.Depot do
  import Ecto.Query

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.{Depot, EctoQueryMaker}
  alias Depot.{WorkQuery, WorkCampaignQuery, ContentQuery, WorkCampaign, Work, Content}

  @doc """
  get Work records from db
  """
  defun get_works(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: [Work.t] do
    Work
    |> filter_by_app_id(:work_app, app_id)
    |> EctoQueryMaker.apply(WorkQuery, filters, opts)
    |> Repo.all()
  end

  defun get_contents(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: [Content.t] do
    Content
    |> filter_by_app_id(:content_app, app_id)
    |> EctoQueryMaker.apply(ContentQuery, filters, opts)
    |> Repo.all()
  end

  defun get_work_campaigns(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: [WorkCampaign.t] do
    WorkCampaign
    |> filter_by_app_id(:work_campaign_app, app_id)
    |> EctoQueryMaker.apply(WorkCampaignQuery, filters, opts)
    |> Repo.all()
  end

  @doc """
  get a Work record form db
  """
  defun get_work(app_id :: v[integer], filters :: v[list], opts :: v[list] \\ []) :: Work.t | nil do
    Work
    |> filter_by_app_id(:work_app, app_id)
    |> EctoQueryMaker.apply(WorkQuery, filters, opts)
    |> Repo.one()
  end

  defp filter_by_app_id(module, assoc_app, app_id) do
    module
    |> join(:inner, [r], ra in assoc(r, ^assoc_app))
    |> where([_, ra], ra.app_id == ^app_id)
  end
end
