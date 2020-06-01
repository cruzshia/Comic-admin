defmodule RaiseServer.Depot.WorkCampaignQuery do
  @behaviour RaiseServer.EctoQueryMaker

  import Ecto.Query

  @impl true
  def apply_filter({:campaign_period, now}, query) do
    where(query, [r], r.begin_at <= ^now and r.end_at > ^now)
  end

  def apply_filter(_, query), do: query

  @impl true
  def apply_option({:order_by, sort_by}, query) do
    order_by(query, ^sort_by)
  end

  def apply_option({:limit, limit}, query) do
    limit(query, ^limit)
  end

  def apply_option(_, query), do: query
end
