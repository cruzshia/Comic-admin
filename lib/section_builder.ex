use Croma

defmodule RaiseServer.SectionBuilder do

  alias RaiseServer.{Apps, SectionBuilder}
  alias SectionBuilder.{Home, FreeOnlyNow, FreePeriodical, SearchTop}

  defun generate(app_id :: v[integer], now :: DateTime.t, page :: v[atom]) :: map | nil do
    screen_type = get_screen_type(page)
    case {Apps.get_page_setting(app_id, screen_type), page} do
      {nil, _} ->
        nil
      {%{} = setting, :home} ->
        Home.process(app_id, now, setting)
      {only_now_setting, :free_only_now} ->
        FreeOnlyNow.process_sections(app_id, now, only_now_setting)
      {%{} = recommended_setting, :free_periodical} ->
        FreePeriodical.process(app_id, now, recommended_setting)
      {settings, :search_top} ->
        SearchTop.process(app_id, now, settings)
    end
  end

  defp get_screen_type(:search_top), do: :home
  defp get_screen_type(page), do: page
end
