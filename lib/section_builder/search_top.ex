use Croma

defmodule RaiseServer.SectionBuilder.SearchTop do

  alias RaiseServer.SectionBuilder.Home

  defun process(app_id :: v[integer], now :: DateTime.t, %{"sections" => sections} = settings :: v[map]) :: map do
    types = ["top_banners", "free_only_now"]
    new_sections = for section <- sections, Enum.any?(types, &(&1 == Map.get(section, "type"))), do: section
    Home.process(app_id, now, Map.put(settings, "sections", new_sections))
  end
end
