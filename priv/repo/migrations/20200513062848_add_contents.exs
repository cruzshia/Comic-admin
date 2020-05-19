defmodule RaiseServer.MigrationsAddContents do
  use Ecto.Migration

  def change do
    create table(:contents) do
      add :content_type,        :integer,            null: false
      add :work_id,             references("works"), null: false
      add :name,                :string,             null: false, default: ""
      add :name_kana,           :string,             null: false, default: ""
      add :subtitle,            :string,             null: false
      add :publish_begin_at,    :utc_datetime,       null: false
      add :publish_end_at,      :utc_datetime,       null: false
      add :price_in_coin,       :integer,            null: false, default: 0
      add :sort_code,           :integer,            null: false, default: 0
      add :search_text,         :text,             null: false, default: ""
      add :ngramed_search_text, :text,             null: false, default: ""
      add :thumbnail_image,     :map
      add :volume_number,       :integer

      add :episode_number,             :integer
      add :can_comment,                :boolean
      add :free_ppv_period1_begin_at,  :utc_datetime
      add :free_ppv_period1_end_at,    :utc_datetime
      add :free_ppv_period2_begin_at,  :utc_datetime
      add :free_ppv_period2_end_at,    :utc_datetime
      add :pay_coin_only_begin_at,     :utc_datetime
      add :pay_coin_only_end_at,       :utc_datetime
      add :delivery_item_url,          :string, size: 1000
      add :launch_external_browser,	   :boolean
      add :excluded_in_todays_ranking, :boolean
      add :ads_in_viewer_setting,      :map

      add :goods_service_in_viewer_setting, :string, size: 4000

      add :free_for_limited_time,	   :boolean
      add :description,              :string, size: 1000
      add :required_content_id,	     references("contents")
      add :required_subscription_id, references("subscriptions")

      add :magazine_banner_ads_setting, :map

      timestamps()
    end
  end
end
