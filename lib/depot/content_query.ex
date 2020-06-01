defmodule RaiseServer.Depot.ContentQuery do
  @behaviour RaiseServer.EctoQueryMaker

  import Ecto.Query

  @impl true
  def apply_filter({:published_period, now}, query) do
    where(query, [w], w.publish_begin_at <= ^now and w.publish_end_at > ^now)
  end

  def apply_filter(_, query), do: query
end
