defmodule RaiseServer.AppFactory do
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo
  alias RaiseServer.Apps.App

  def app_factory() do
    %App{
      id:                   0,
      app_id_token:         "dummy_token0", # TODO: Use sequence() of ex_machina
      name:                 "dummy_name",
      common_key:           "dummy_common_key",
      apns_cert:            nil,
      apns_key:             nil,
      fcm_api_key:          nil,
      android_public_key:   nil,
      itunes_shared_secret: nil,
      additional_setting:   %{},
      updated_at:           ~U[2020-01-01 00:00:00Z],
      inserted_at:          ~U[2020-01-01 00:00:00Z],
    }
  end

  # TODO: Use ex_machina
  def insert(:app, attrs \\ %{}) do
    merged = struct!(app_factory(), attrs)
    Repo.insert!(merged)
  end
end
