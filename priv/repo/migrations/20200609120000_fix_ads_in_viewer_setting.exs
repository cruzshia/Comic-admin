defmodule RaiseServer.Migrations.FixAdsInViewerSetting do
  use Ecto.Migration

  def change do
    alter table(:works) do
      modify :ads_in_viewer_setting, :jsonb, default: "[]"
    end

    alter table(:contents) do
      modify :ads_in_viewer_setting, :jsonb, default: "[]"
    end
  end
end
