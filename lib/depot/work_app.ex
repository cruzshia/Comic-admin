defmodule RaiseServer.Depot.WorkApp do
  use Ecto.Schema

  @timestamps_opts [type: :utc_datetime]

  schema "work_apps" do
    belongs_to :work, RaiseServer.Depot.Work
    belongs_to :app, RaiseServer.Apps.App

    timestamps()
  end
end
