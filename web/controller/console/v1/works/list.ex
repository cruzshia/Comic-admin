use Croma

defmodule RaiseServer.Controller.Console.V1.Works.List do
  use RaiseServer.Controller.Api

  alias Croma.{Result, TypeGen}
  alias RaiseServer.Controller.Api
  alias RaiseServer.Controller.Console.V1.{Works.Helper, Query}

  plug Antikythera.Plug.IpFiltering, :check_by_static_ranges, [ranges: RaiseServer.Controller.Console.V1.Ip.ip_ranges()]
  plug RaiseServer.Plug.VerifyConsoleApiToken, :verify, []

  defmodule QueryParams do
    defmodule SubscriptionId do
      use Croma.SubtypeOfInt, min: 1
      def new("sb" <> s), do: Query.to_integer(s) |> Result.wrap_if_valid(__MODULE__)
      def new(i), do: Result.wrap_if_valid(i, __MODULE__)
    end

    defmodule AppId do
      use Croma.SubtypeOfInt, min: 1
      def new(s) when is_binary(s), do: Query.to_integer(s) |> Result.wrap_if_valid(__MODULE__)
      def new(i), do: Result.wrap_if_valid(i, __MODULE__)
    end

    defmodule WorkType do
      use Croma.SubtypeOfAtom, values: RaiseServer.WorkTypeEnum.__enum_map__() |> Keyword.keys()
    end

    defmodule ReturnAdRevenue do
      use Croma.SubtypeOfAtom, values: [:true, :false]
    end

    use Croma.Struct, recursive_new?: true, fields: [
      # TODO: Supports search using work_keyword and author_keyword fields. RA-4717(https://r-project.atlassian.net/browse/RA-4717)
      limit:                           Query.Limit,
      offset:                          Query.Offset,
      work_keyword:                    TypeGen.nilable(Croma.String),
      author_keyword:                  TypeGen.nilable(Croma.String),
      app_id:                          TypeGen.nilable(AppId),
      subscription_id:                 TypeGen.nilable(SubscriptionId),
      work_type:                       TypeGen.nilable(WorkType),
      magazine_name:                   TypeGen.nilable(Croma.String),
      update_frequency:                TypeGen.nilable(Croma.String),
      return_ad_revenue:               TypeGen.nilable(ReturnAdRevenue),
      free_periodical_day_of_the_week: TypeGen.nilable(Croma.String),
      publish_begin_at_from:           TypeGen.nilable(Query.CromaDateTime),
      publish_begin_at_to:             TypeGen.nilable(Query.CromaDateTime),
      publish_end_at_from:             TypeGen.nilable(Query.CromaDateTime),
      publish_end_at_to:               TypeGen.nilable(Query.CromaDateTime),
    ]
  end

  defun get(%Conn{request: %{query_params: query}} = conn) :: Conn.t do
    Api.validate_params(conn, query, QueryParams, fn conn1, query ->
      {filters, options} = generate_query(query)
      res = Helper.get_works(filters, options) |> to_response()
      Conn.json(conn1, 200, res)
    end)
  end

  defunp generate_query(query :: v[map]) :: {list, list} do
    query
    |> Map.from_struct()
    |> Enum.reduce({[], []}, &query_acc/2)
  end

  defunp query_acc(element :: {atom, any}, acc :: {list, list}) :: {list, list} do
    ({_, nil}, acc) ->
      acc
    ({k, _v} = e, {filters, options}) when k in [:limit, :offset] ->
      {filters, [e | options]}
    (e, {filters, options}) ->
      {[e | filters], options}
  end

  defunp to_response({total_count, works} :: {number, list}) :: map do
    formatted_works = Enum.map(works, fn work ->
      Map.merge(work, %{id: Helper.add_resource_prefix(work), images: Helper.format_images(work.images)})
    end)

    %{total_count: total_count, works: formatted_works}
  end
end
