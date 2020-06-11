defmodule RaiseServer.Depot.ContentQuery do
  @behaviour RaiseServer.EctoQueryMaker
  import Ecto.Query

  alias RaiseServer.TimeZoneDatabase
  alias RaiseServer.Depot
  alias Depot.Work

  @six_days_in_second 60 * 60 * 24 * 6

  @impl true
  def apply_option({:distinct, distinict_by}, query) do
    query
    |> distinct(^distinict_by)
  end

  def apply_option({:order_by, sort_by}, query) do
    query
    |> order_by(^sort_by)
  end

  @impl true
  def apply_filter({:published_period, now}, query) do
    where(query, [w], w.publish_begin_at <= ^now and w.publish_end_at > ^now)
  end

  def apply_filter({:published_last_seven_jst_days, now}, query) do
    begin_at = now
    |> DateTime.shift_zone("Asia/Tokyo", TimeZoneDatabase)
    |> elem(1)
    |> Map.merge(%{hour: 0, minute: 0, second: 0, microsecond: {0, 0}})
    |> DateTime.shift_zone("Etc/UTC", TimeZoneDatabase)
    |> elem(1)
    |> DateTime.add(-@six_days_in_second)

    query
    |> where([c, ...], c.publish_begin_at >= ^begin_at and c.publish_begin_at <= ^now)
    |> where([c, ...], c.publish_end_at > ^now)
  end

  def apply_filter(_, query), do: query

  @impl true
  def apply_join({:work_for_home_daily_ranking, types}, query) do
    query
    |> join(:inner, [q, ...], w in Work, on: q.work_id == w.id and w.episode_work_type in ^types)
    |> preload([..., w], [work: w])
  end
end
