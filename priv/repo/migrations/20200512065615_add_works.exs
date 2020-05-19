defmodule RaiseServer.Migrations.AddWorks do
  use Ecto.Migration

  def change do
    create table(:works) do
      add :work_type,           :integer,       null: false
      add :title,               :string,        null: false
      add :title_kana,          :string,        null: false, default: ""
      add :title_short,         :string,        null: false, default: ""
      add :description,         :string,        null: false, default: ""
      add :search_text,         :text,          null: false, default: ""
      add :ngramed_search_text, :text,          null: false, default: ""
      add :publish_begin_at,    :utc_datetime,  null: false
      add :publish_end_at,      :utc_datetime,  null: false
      add :images,              :map,           default: %{}

      add :episode_work_type,               :integer
      add :update_frequency,                :string
      add :free_periodical_day_of_the_week, :string
      add :comic_appeal_work_id,            :integer
      add :catchphrase,                     :string
      add :ads_in_viewer_setting,           :map, default: %{}
      add :show_list_from_1st,              :boolean
      add :page_alignment_direction,        :integer

      add :magazine_name, :string

      add :is_color,                     :boolean
      add :subscription_id,              references(:subscriptions)
      add :is_main_work_of_subscription, :boolean
      add :magazine_banner_ads_setting,  :map, default: %{}

      timestamps()
    end

    create index(:works, :work_type)
    create index(:works, :episode_work_type)
    create index(:works, :subscription_id)
  end
end
