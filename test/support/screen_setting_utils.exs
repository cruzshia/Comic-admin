defmodule RaiseServer.ScreenSettingUtils do
  def find_section(setting_str, section_type) do
    :jsx.decode(setting_str, return_maps: true)
    |> Map.get("sections", [])
    |> Enum.find(& &1["type"] == section_type)
  end
end
