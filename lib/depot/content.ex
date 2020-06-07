defmodule RaiseServer.Depot.Content do
  use Ecto.Schema

  alias RaiseServer.Depot

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "contents" do
    belongs_to :work, Depot.Work
    field :content_type,               RaiseServer.ContentTypeEnum
    field :name,                       :string
    field :name_kana,                  :string
    field :subtitle,                   :string
    field :publish_begin_at,           :utc_datetime
    field :publish_end_at,             :utc_datetime
    field :price_in_coin,              :integer
    field :sort_code,                  :integer
    embeds_one :thumbnail_image,       Depot.Image
    field :volume_number,              :integer
    field :search_text,                :string
    field :ngramed_search_text,        :string

    field :episode_number,             :integer
    field :can_comment,                :boolean
    field :free_ppv_period1_begin_at,  :utc_datetime
    field :free_ppv_period1_end_at,    :utc_datetime
    field :free_ppv_period2_begin_at,  :utc_datetime
    field :free_ppv_period2_end_at,    :utc_datetime
    field :pay_coin_only_begin_at,     :utc_datetime
    field :pay_coin_only_end_at,       :utc_datetime
    field :delivery_item_url,          :string
    field :launch_external_browser,	   :boolean
    field :excluded_in_todays_ranking, :boolean
    field :is_pr_content,              :boolean
    field :ads_in_viewer_setting,      :map

    field :goods_service_in_viewer_setting, :string

    field :free_for_limited_time,	     :boolean
    field :description,                :string
    belongs_to :required_content,	     Depot.Content
    belongs_to :required_subscription, Depot.Subscription

    field :magazine_banner_ads_setting, :map

    has_one :content_app, Depot.ContentApp
    has_one :content_assessment, Depot.ContentAssessment

    timestamps()
  end
end
