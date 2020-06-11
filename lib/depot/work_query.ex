defmodule RaiseServer.Depot.WorkQuery do
  @behaviour RaiseServer.EctoQueryMaker
  import Ecto.Query

  alias RaiseServer.Depot
  alias RaiseServer.Depot.{Content, ContentAssessment}

  @impl true
  def apply_filter({:published_period, now}, query) do
    where(query, [w], w.publish_begin_at <= ^now and w.publish_end_at > ^now)
  end

  def apply_filter({:like, {attr, like}}, query) do
    where(query, [w], like(field(w, ^attr), ^like))
  end

  def apply_filter({:app_id, app_id}, query) do
    query
    |> join(:inner, [w], wa in assoc(w, :work_apps))
    |> where([_, wa], wa.app_id == ^app_id)
  end

  def apply_filter({:publish_begin_at_from, from}, query) do
    where(query, [w], w.publish_begin_at >= ^from)
  end

  def apply_filter({:publish_begin_at_to, to}, query) do
    where(query, [w], w.publish_begin_at <= ^to)
  end

  def apply_filter({:publish_end_at_from, from}, query) do
    where(query, [w], w.publish_end_at >= ^from)
  end

  def apply_filter({:publish_end_at_to, to}, query) do
    where(query, [w], w.publish_end_at <= ^to)
  end

  def apply_filter(_, query), do: query

  @impl true
  def apply_option({:order_by, sort_by}, query) do
    order_by(query, ^sort_by)
  end

  def apply_option({:limit, limit}, query) do
    limit(query, ^limit)
  end

  def apply_option({:offset, offset}, query) do
    offset(query, ^offset)
  end

  def apply_option({:join_latest_content_order_by_publish_begin_at, app_id}, query) do
    join_query =
      Content
      |> Depot.filter_by_app_id(:content_apps, app_id)
      |> order_by(desc: :publish_begin_at)
      |> select([:work_id, :publish_begin_at])
      |> distinct([:work_id])

    query
    |> join(:left, [w], c in subquery(join_query), on: w.id == c.work_id)
    |> order_by([..., c], desc: c.publish_begin_at)
    |> select_merge([..., c], %{last_content_published_at: c.publish_begin_at})
  end

  def apply_option({:recommended_work_first, recommended_id}, query) do
    order_by(query, [w, ...], desc: w.id == ^recommended_id)
  end

  def apply_option({:work_campaign, {app_id, now}}, query) do
    from(
      w in query,
      inner_join: wc in assoc(w, :work_campaign),
      inner_join: wcp in assoc(wc, :work_campaign_apps),
      on: w.id == wc.work_id and wcp.app_id == ^app_id and wcp.work_campaign_id == wc.id and wc.begin_at <= ^now and wc.end_at > ^now,
      preload: [:work_campaign]
    )
  end

  @impl true
  def apply_option({:free_ppv_begin_date, {jst_today_start, jst_tomorrow_start}}, query) do
    from(
      q in query,
      inner_join: c in Content,
      inner_join: ca in ContentAssessment,
      on: q.id == c.work_id and c.id == ca.content_id,
      where: (^jst_today_start <= c.free_ppv_period1_begin_at and c.free_ppv_period1_begin_at < ^jst_tomorrow_start)
      or (^jst_today_start <= c.free_ppv_period2_begin_at and c.free_ppv_period2_begin_at < ^jst_tomorrow_start),
      order_by: [desc: ca.view_count, asc: q.title_kana],
      select_merge: %{contents: c}
    )
  end

  def apply_option(_, query), do: query

  @impl true
  def apply_preload({:newest_content, {app_id, now}}) do
    query = from(c in Content,
        join: cp in assoc(c, :content_apps),
        on: cp.app_id == ^app_id
      )
      |> where([c], c.publish_begin_at <= ^now and c.publish_end_at > ^now)
      |> order_by(desc: :publish_begin_at)
      |> distinct([:work_id])

    {:contents, query}
  end

  def apply_preload({:latest_content_update_at, {app_id, now}}) do
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
