defmodule RaiseServer.ScreenSettingUtils do
  def find_section(setting_str, section_type) when is_binary(setting_str) do
    :jsx.decode(setting_str, return_maps: true)
    |> find_section(section_type)
  end

  def find_section(setting, section_type) do
    setting
    |> Map.get("sections", [])
    |> Enum.find(& &1["type"] == section_type)
  end
end
