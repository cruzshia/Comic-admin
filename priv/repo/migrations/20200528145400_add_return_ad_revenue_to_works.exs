defmodule RaiseServer.Migrations.ReturnAdRevenueToWorks do
  use Ecto.Migration

  def change do
    alter table(:works) do
      add :return_ad_revenue, :boolean
    end
  end
end
