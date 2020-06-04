defmodule RaiseServer.Depot.WorkCampaignQuery do
  @behaviour RaiseServer.EctoQueryMaker

  import Ecto.Query
  alias RaiseServer.Depot.Work

  @impl true
  def apply_filter({:campaign_period, now}, query) do
    where(query, [r], r.begin_at <= ^now and r.end_at > ^now)
  end

  def apply_filter(:free_range_exists, query) do
    where(query, [q], not is_nil(q.free_range))
  end

  def apply_filter(_, query), do: query

  @impl true
  def apply_option({:order_by, sort_by}, query) do
    order_by(query, ^sort_by)
  end

  def apply_option(:read_in_one_go_order, query) do
    from(
      wc in query,
      inner_join: w in Work,
      on: wc.work_id == w.id,
      order_by: [asc: wc.end_at, asc: w.title_kana, asc: wc.id],
      select_merge: %{work: w}
    )
  end

  def apply_option({:limit, limit}, query) do
    limit(query, ^limit)
  end

  def apply_option(_, query), do: query
end
