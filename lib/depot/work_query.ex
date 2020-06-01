defmodule RaiseServer.Depot.WorkQuery do
  @behaviour RaiseServer.EctoQueryMaker

  import Ecto.Query
  alias RaiseServer.Depot.Content

  @impl true
  def apply_filter({:published_period, now}, query) do
    where(query, [w], w.publish_begin_at <= ^now and w.publish_end_at > ^now)
  end

  def apply_filter({:like, {attr, like}}, query) do
    where(query, [w], like(field(w, ^attr), ^like))
  end

  def apply_filter(_, query), do: query

  @impl true
  def apply_option({:order_by, sort_by}, query) do
    order_by(query, ^sort_by)
  end

  def apply_option(_, query), do: query

  @impl true
  def apply_preload({:newest_content, {app_id, now}}) do
    query = from(c in Content,
        join: cp in assoc(c, :content_app),
        on: cp.app_id == ^app_id
      )
      |> where([c], c.publish_begin_at <= ^now and c.publish_end_at > ^now)
      |> order_by(desc: :publish_begin_at)
      |> distinct([:work_id])

    {:contents, query}
  end

  def apply_preload({:free_content_period, {app_id, now}}) do
    {preload, query} = apply_preload({:newest_content, {app_id, now}})
    subquery =
      query
      |> select([c], %{
          work_id: c.work_id,
          publish_begin_at: c.publish_begin_at,
          free_period1_begin_at: fragment(
            """
            case
              when free_ppv_period1_begin_at > ? or free_ppv_period1_begin_at is null then publish_begin_at
              else free_ppv_period1_begin_at
            end
            """, ^now),
          free_period2_begin_at: fragment(
            """
            case
              when free_ppv_period2_begin_at > ? or free_ppv_period2_begin_at is null then publish_begin_at
              else free_ppv_period2_begin_at
            end
            """, ^now),
        }
      )
    new_query =
      from(c in subquery(subquery),
        select: %{
          update_at: fragment(
            """
            case
              when free_period1_begin_at >= publish_begin_at and free_period1_begin_at >= free_period2_begin_at then free_period1_begin_at
              when free_period2_begin_at >= publish_begin_at and free_period2_begin_at >= free_period1_begin_at then free_period2_begin_at
              else publish_begin_at
            end
            """) |> max()
        }
      )
      |> group_by([:work_id, :publish_begin_at])

    {preload, new_query}
  end

  def apply_preload(preload), do: preload
end
