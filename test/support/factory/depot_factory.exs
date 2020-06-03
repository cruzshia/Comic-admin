defmodule RaiseServer.DepotFactory do
  alias AntikytheraAcs.Ecto.PostgresRepo, as: Repo

  alias RaiseServer.Depot
  alias Depot.{Campaign, Content, ContentApp, Work, WorkApp, WorkCampaign, WorkCampaignApp, Image, Subscription}
  alias Depot.{Author, WorkAuthor, WorkAssessment, ContentAssessment}

  def work_app_factory() do
    %WorkApp{}
  end

  def subscription_factory() do
    {p_start, p_end} = publish_range()
    %Subscription{
      name: "some name",
      publish_begin_at: p_start,
      publish_end_at: p_end
    }
  end

  def img_factory() do
    %Image{
      path: "production/image/works/121/image4s/original/8e92de9bdf91e4f2929a3afc8a1518f7.jpg",
      height: 240,
      width: 240
    }
  end

  def work_factory do
    {p_start, p_end} = publish_range()
    %Work{
      work_type:                       0,
      title:                           "終わりのパンダ",
      title_kana:                      "オワリノパンダ",
      title_short:                     "終わパン",
      description:                     "パンダパンダ",
      publish_begin_at:                p_start,
      publish_end_at:                  p_end,
      images:                          %Depot.Images{image1: img_factory()},
      episode_work_type:               1,
      update_frequency:                "毎週月水金曜日",
      free_periodical_day_of_the_week: nil,
      comic_appeal_work_id:            1,
      catchphrase:                     "買って",
      ads_in_viewer_setting:           nil,
      show_list_from_1st: true
    }
  end

  def magazine_work_factory do
    work_factory()
    |> struct!(%{work_type: :magazine, magazine_name: "some mag name"})
  end

  def episode_work_factory do
    work_factory()
    |> struct!(%{
      work_type: :episode,
      episode_work_type: :original
    })
  end

  def content_factory() do
    {p_start, p_end} = publish_range()
    %Content{
      content_type:               :episode,
      name:                       "終わりのパンダ 01",
      name_kana:                  "オワリノパンダ 01",
      publish_begin_at:           p_start,
      publish_end_at:             p_end,
      free_for_limited_time:      false,
      price_in_coin:              125,
      sort_code:                  0,
      thumbnail_image:            img_factory(),
      volume_number:              1,
      subtitle:                   "パンダ",
      episode_number:             1,
      can_comment:                true,
      free_ppv_period1_begin_at:  nil,
      free_ppv_period1_end_at:    nil,
      free_ppv_period2_begin_at:  nil,
      free_ppv_period2_end_at:    nil,
      pay_coin_only_begin_at:     nil,
      pay_coin_only_end_at:       nil,
      delivery_item_url:          "https://wwwwwwwwwwwwwww",
      launch_external_browser:    false,
      excluded_in_todays_ranking: true,
      ads_in_viewer_setting:      %{},
    }
  end

  def magazine_content_factory do
    content_factory()
    |> struct!(%{content_type: :magazine})
  end

  def episode_content_factory do
    content_factory()
    |> struct!(%{content_type: :episode, excluded_in_todays_ranking: false})
  end

  def campaign_factory() do
    {start_at, end_at} = publish_range()
    %Campaign{
      name: "dummy_name",
      note: "dummy_note",
      for_management_begin_at: start_at,
      for_management_end_at: end_at
    }
  end

  def work_campaign_factory() do
    {start_at, end_at} = publish_range()
    %WorkCampaign{
      priority: 0,
      description: nil,
      images: [],
      free_range_display_string: "dummy_free_range_display_string",
      begin_at: start_at,
      end_at: end_at
    }
  end

  def work_campaign_app_factory() do
    %WorkCampaignApp{}
  end

  def content_app_factory() do
    %ContentApp{}
  end

  def work_assessment_factory() do
    %WorkAssessment{
      comment_count: 100,
      like_count: 100,
      view_count: 100,
    }
  end

  def content_assessment_factory() do
    %ContentAssessment{}
  end

  def author_factory() do
    %Author{
      name: "Qoo"
    }
  end

  def work_author_factory() do
    %WorkAuthor{}
  end

  def insert(schema_name, attrs \\ %{}) do
    schema_function = "#{schema_name}_factory" |> String.to_existing_atom

    apply(__MODULE__, schema_function, [])
    |> struct!(attrs)
    |> Repo.insert!
  end

  defp publish_range() do
    utc_now = DateTime.utc_now |> DateTime.truncate(:second)
    {DateTime.add(utc_now, -3600 * 24 * 7, :second), DateTime.add(utc_now, 3600 * 24 * 7, :second)}
  end
end
