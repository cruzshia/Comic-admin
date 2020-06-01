defmodule RaiseServer.Depot.Work do
  use Ecto.Schema

  alias RaiseServer.Depot

  @type t :: %__MODULE__{}

  @timestamps_opts [type: :utc_datetime]

  schema "works" do
    field :work_type,           RaiseServer.WorkTypeEnum
    field :title,               :string
    field :title_kana,          :string
    field :title_short,         :string
    field :description,         :string
    field :publish_begin_at,    :utc_datetime
    field :publish_end_at,      :utc_datetime
    field :search_text,         :string
    field :ngramed_search_text, :string
    embeds_one :images,         Depot.Images

    field :episode_work_type,               :integer
    field :update_frequency,                :string
    field :free_periodical_day_of_the_week, :string
    field :comic_appeal_work_id,            :integer
    field :catchphrase,                     :string
    field :ads_in_viewer_setting,           :map
    field :show_list_from_1st,              :boolean
    field :page_alignment_direction,        :integer

    field :magazine_name, :string

    field :is_color,                     :boolean
    belongs_to :subscription,            Depot.Subscription
    field :is_main_work_of_subscription, :boolean
    field :magazine_banner_ads_setting,  :map

    has_one :work_app, Depot.WorkApp
    has_many :contents, Depot.Content
    has_many :work_authors, Depot.WorkAuthor
    has_many :authors, through: [:work_authors, :author]

    timestamps()
  end
end
