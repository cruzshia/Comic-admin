defmodule RaiseServer.SectionBuilder.Utils do

  @seven_days_in_seconds 3600 * 24 * 7

  def add_resource_prefix(%{work_type: type} = work) do
    "#{type |> to_string() |> String.first()}w#{work.id}"
  end

  def add_resource_prefix(%{content_type: type} = content) do
    "#{type |> to_string() |> String.first()}c#{content.id}"
  end

  def translate_english_to_japanese(:episode), do: "話"
  def translate_english_to_japanese(:comic), do: "コミックス"
  def translate_english_to_japanese(:novel), do: "ノベル"
  def translate_english_to_japanese(:magazine), do: "雑誌"
  def translate_english_to_japanese(:bonus), do: "壁紙"

  def parse_resource_prefix(<<_prefix :: binary-size(2), str_id :: binary>>) do
    case Integer.parse(str_id) do
      {id, _} -> id
      _       -> nil
    end
  end

  def parse_resource_prefix(_), do: nil

  def ids_to_int(ids) do
    Enum.reduce(ids, [], fn id, acc ->
      case parse_resource_prefix(id) do
        nil -> acc
        id  -> [id | acc]
      end
    end)
    |> Enum.reverse()
  end

  def format_image(image) do
    RaiseServer.get_env("cdn_host")
    |> format_image(image)
  end

  def is_new_material(material_dt, pov_dt) do
    DateTime.diff(material_dt, pov_dt) <= @seven_days_in_seconds
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

  def calculate_new_episode_badge(%{contents: [], publish_begin_at: publish_begin_at} = _work, now) do
    DateTime.diff(now, DateTime.from_naive!(publish_begin_at, "Etc/UTC")) < @seven_days_in_seconds
  end

  def calculate_new_episode_badge(%{contents: [content]} = _work, now) do
    DateTime.diff(now, DateTime.from_naive!(content.update_at, "Etc/UTC")) < @seven_days_in_seconds
  end
end
