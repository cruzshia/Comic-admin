defmodule RaiseServer.DepotFactory do
  use RaiseServer.Factory

  alias RaiseServer.Depot
  alias Depot.{Campaign, Content, ContentApp, ContentAssessment, Work, WorkAuthor, WorkCampaign, WorkCampaignApp, Image, Subscription}
  alias Depot.{Author, WorkApp, WorkAssessment, AdsInViewerSetting}

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

  def image_factory do
    %Image{
      path: "/production/image/works/121/image4s/original/8e92de9bdf91e4f2929a3afc8a1518f7.jpg",
      height: 240,
      width: 240
    }
  end

  def ads_in_viewer_settings_factory() do
    %Depot.AdsInViewerSettings{
      device: "ios",
      front_ads: [
        %AdsInViewerSetting{
          action_url: "http://~~~",
          begin_at: ~U[2020-01-10 09:10:32Z],
          button_wording: "購入はこちら",
          end_at: ~U[2020-01-11 09:10:32Z],
          image_url: "http://~~~",
          type: "original",
        },
        %AdsInViewerSetting{
          action_url: "http://~~~",
          begin_at: ~U[2020-01-10 09:10:32Z],
          button_wording: "購入はこちら",
          end_at: ~U[2020-01-11 09:10:32Z],
          image_url: "http://~~~",
          type: "original",
        },
      ],
      back_ads: [
        %AdsInViewerSetting{
          action_url: nil,
          begin_at: nil,
          button_wording: nil,
          end_at: nil,
          image_url: nil,
          type: "admob",
        },
        %AdsInViewerSetting{
          action_url: nil,
          begin_at: nil,
          button_wording: nil,
          end_at: nil,
          image_url: nil,
          type: "map",
        },
        %AdsInViewerSetting{
          action_url: "http://~~~",
          begin_at: ~U[2020-01-10 09:10:32Z],
          button_wording: "購入はこちら",
          end_at: ~U[2020-01-11 09:10:32Z],
          image_url: "http://~~~",
          type: "original",
        },
      ],
    }
  end
  def work_factory do
    {p_start, p_end} = publish_range()
    images = %Depot.Images{image1: image_factory(), image2: image_factory(), image3: image_factory(), image4: image_factory()}
    %Work{
      work_type:                       0,
      title:                           "終わりのパンダ",
      title_kana:                      "オワリノパンダ",
      title_short:                     "終わパン",
      description:                     "パンダパンダ",
      publish_begin_at:                p_start,
      publish_end_at:                  p_end,
      images:                          images,
      episode_work_type:               1,
      update_frequency:                "毎週月水金曜日",
      free_periodical_day_of_the_week: nil,
      magazine_name:                   "magazine name",
      comic_appeal_work_id:            1,
      catchphrase:                     "買って",
      return_ad_revenue:               false,
      ads_in_viewer_setting:           [ads_in_viewer_settings_factory()],
      show_list_from_1st:              true,
    }
  end

  def magazine_work_factory do
    work_factory()
    |> struct!(%{work_type: :magazine, magazine_name: nil})
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
      thumbnail_image:            build(:image),
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
      work: build(:work)
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
      free_range: nil,
      free_range_display_string: nil,
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
end
