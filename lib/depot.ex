use Croma

defmodule RaiseServer.Depot do
  import Ecto.Query

  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.Depot
  alias Depot.{WorkCampaign, Work, Content}

  @doc """
  get Work records from db
  """
  defun get_works(app_id :: v[integer], ids :: v[[integer]], opts \\ []) :: [Work.t] do
    select_by = Keyword.get(opts, :select, :all)
    time = Keyword.get(opts, :time, nil)

    Work
    |> filter_by_app_id(:work_app, app_id)
    |> where([w], w.id in ^ids)
    |> filter_by_publish_time(time)
    |> apply_select(select_by)
    |> Repo.all()
  end

  defun get_contents(app_id :: v[integer], content_ids :: v[[integer]], opts :: v[list] \\ []) :: [Content.t] do
    select_by = Keyword.get(opts, :select, :all)
    time = Keyword.get(opts, :time, nil)

    Content
    |> filter_by_app_id(:content_app, app_id)
    |> where([c], c.id in ^content_ids)
    |> filter_by_publish_time(time)
    |> apply_select(select_by)
    |> Repo.all()
  end

  defun get_work_campaigns(app_id :: v[integer], now, opts :: v[list] \\ []) :: [WorkCampaign.t] do
    limit = Keyword.get(opts, :limit, nil)
    select_by = Keyword.get(opts, :select, :all)
    order_by = Keyword.get(opts, :order_by, [])
    preloads = Keyword.get(opts, :preload, []) |> Enum.map(&works_preload/1)

    WorkCampaign
    |> filter_by_app_id(:work_campaign_app, app_id)
    |> where([wc], wc.begin_at < ^now and ^now < wc.end_at)
    |> apply_select(select_by)
    |> order_by(^order_by)
    |> limit(^limit)
    |> preload(^preloads)
    |> Repo.all()
  end

  @doc """
  get a Work record form db
  """
  defun get_work(app_id, conditions :: Keyword.t, opts \\ []) :: Work.t do
    where_query = Enum.reduce(conditions, dynamic(true), &work_where_query/2)

    preloads =
      Keyword.get(opts, :preload, [])
      |> Enum.map(&works_preload/1)

    Work
    |> filter_by_app_id(:work_app, app_id)
    |> where(^where_query)
    |> preload(^preloads)
    |> Repo.one()
  end

  defp works_preload(:newest_content) do
    query = Content
    |> order_by(desc: :publish_begin_at)
    |> limit(1)

    {:contents, query}
  end

  defp works_preload(preload), do: preload

  defp work_where_query({:subscription_id, sub_id}, dynamic) do
    dynamic([w], ^dynamic and w.subscription_id == ^sub_id)
  end

  defp work_where_query({:is_main_work_of_subscription, _}, dynamic) do
    dynamic([w], ^dynamic and w.is_main_work_of_subscription == true)
  end

  defp work_where_query({:time, time}, dynamic) do
    dynamic([w], ^dynamic and w.publish_begin_at < ^time and ^time < w.publish_end_at)
  end

  defp apply_select(query, :all), do: query

  defp apply_select(query, select_by), do: select(query, [q], map(q, ^select_by))

  defp filter_by_app_id(module, assoc_app, app_id) do
    module
    |> join(:inner, [r], ra in assoc(r, ^assoc_app))
    |> where([_, ra], ra.app_id == ^app_id)
  end

  defp filter_by_publish_time(query, nil), do: query

  defp filter_by_publish_time(query, time) do
    query
    |> where([q], q.publish_begin_at < ^time and ^time < q.publish_end_at)
  end
end
