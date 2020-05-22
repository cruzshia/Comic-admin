defmodule RaiseServer.SectionBuilder.Utils do

  def add_resource_prefix(%{work_type: type} = work) do
    "#{type |> to_string |> String.first}w#{work.id}"
  end

  def add_resource_prefix(%{content_type: type} = content) do
    "#{type |> to_string |> String.first}c#{content.id}"
  end

  def translate_english_to_japanese(:episode), do: "話"
  def translate_english_to_japanese(:comic), do: "コミックス"
  def translate_english_to_japanese(:novel), do: "ノベル"
  def translate_english_to_japanese(:magazine), do: "雑誌"
  def translate_english_to_japanese(:bonus), do: "壁紙"
end