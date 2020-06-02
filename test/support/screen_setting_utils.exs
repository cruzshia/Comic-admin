defmodule RaiseServer.ScreenSettingUtils do
  def find_section(setting, section_type) do
    setting
    |> Map.get("sections", [])
    |> Enum.find(& &1["type"] == section_type)
  end
end
