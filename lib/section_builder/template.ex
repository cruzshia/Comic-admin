defmodule RaiseServer.SectionBuilder.Template do

  def add_resource_prefix(%{work_type: type} = work) do
    "#{type |> to_string |> String.first}w#{work.id}"
  end

  def add_resource_prefix(%{content_type: type} = content) do
    "#{type |> to_string |> String.first}c#{content.id}"
  end
end
