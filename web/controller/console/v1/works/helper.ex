use Croma

defmodule RaiseServer.Controller.Console.V1.Works.Helper do
  alias RaiseServer.Depot

  defmodule Id do
    use Croma.SubtypeOfString, pattern: ~R/\A(?<prefix>ew|cw|mw|bw)(?<id>\d+)\z/
  end

  defun get_works(query :: v[list], opts :: v[list] \\ []) :: {integer, [Depot.Work.t]} do
    # TODO: Specify the correct default order. RA-4717(https://r-project.atlassian.net/browse/RA-4717)
    query_options = [
      select:   [:id, :title, :work_type, :inserted_at, :episode_work_type, :update_frequency, :images],
      order_by: [asc: :id],
    ] ++ opts

    {Depot.count_works_for_console(query), Depot.get_works_for_console(query, query_options)}
  end

  defun get_work(work_id :: v[Id.t]) :: Depot.Work.t | nil do
    query_filters = [id: parse_resource_prefix(work_id)]
    Depot.get_work_for_console(query_filters)
  end

  defun format_ads_in_viewer_setting(%{device: device, front_ads: front_ads, back_ads: back_ads}) :: Depot.AdsInViewerSettings.t do
    front_ads_without_nil =
      Enum.map(front_ads, fn fa ->
        fa
        |> Map.from_struct()
        |> drop_nil_field()
      end)
    back_ads_without_nil =
      Enum.map(back_ads, fn ba ->
        ba
        |> Map.from_struct()
        |> drop_nil_field()
      end)
    %Depot.AdsInViewerSettings{device: device, front_ads: front_ads_without_nil, back_ads: back_ads_without_nil}
  end

  defun add_resource_prefix(%{work_type: type} = work :: Depot.Work.t) :: Id.t do
    "#{type |> to_string() |> String.first()}w#{work.id}"
  end

  defun parse_resource_prefix(id :: v[Id.t]) :: integer do
    %{"id" => str_id} = Regex.named_captures(Id.pattern(), id)
    String.to_integer(str_id)
  end

  defun drop_nil_field(map :: v[map]) :: map do
    map
    |> Enum.reject(fn {_, v} -> is_nil(v) end)
    |> Map.new()
  end

  defun format_image(image :: v[map]) :: map do
    RaiseServer.get_env("cdn_host")
    |> format_image(image)
  end

  defp format_image(_, nil), do: nil
  defp format_image(nil, image), do: format_image("", image)
  defp format_image(host, image) do
    %{
      url:    "https://" <> host <> "/" <> image.path,
      width:  image.width,
      height: image.height,
    }
  end

  @doc """
  Generate download URLs from multiple file paths on S3
  """
  defun format_images(images :: v[map]) :: map do
    images
    |> Map.from_struct()
    |> Enum.map(fn {k, v} -> {k, format_image(v)} end)
    |> Map.new()
  end
end
