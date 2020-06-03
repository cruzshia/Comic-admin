defmodule RaiseServer.TimeZoneDatabase do
  @behaviour Calendar.TimeZoneDatabase

  @jst_offset 60 * 60 * 9

  @impl true
  def time_zone_period_from_utc_iso_days(_, "Asia/Tokyo"),
    do: {:ok, %{std_offset: 0, utc_offset: @jst_offset, zone_abbr: "JST"}}

  def time_zone_period_from_utc_iso_days(_, "Etc/UTC"),
    do: {:ok, %{std_offset: 0, utc_offset: 0, zone_abbr: "UTC"}}

  def time_zone_period_from_utc_iso_days(_, _),
    do: {:error, :utc_and_jst_only_time_zone_database}

  @impl true
  def time_zone_periods_from_wall_datetime(_, "Asia/Tokyo"),
    do: {:ok, %{std_offset: 0, utc_offset: @jst_offset, zone_abbr: "JST"}}

  def time_zone_periods_from_wall_datetime(_, "Etc/UTC"),
    do: {:ok, %{std_offset: 0, utc_offset: 0, zone_abbr: "UTC"}}

  def time_zone_periods_from_wall_datetime(_, _),
    do: {:error, :utc_and_jst_only_time_zone_database}
end
