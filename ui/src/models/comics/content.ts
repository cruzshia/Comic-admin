export enum ContentKeys {
  ID = 'id',
  ContentType = 'content_type',
  Name = 'name',
  NameKana = 'name_kana',
  Description = 'description',
  Authors = 'authors',
  Apps = 'apps',
  WorkId = 'work_id',
  CoinPrice = 'price_in_coin',
  DeliveryUrl = 'delivery_item_url',
  SortCode = 'sort_code',
  FreeForLimitedTime = 'free_for_limited_time',
  EpisodeNum = 'episode_number',
  ThumbnailImg = 'thumbnail_image',
  RequiredContentId = 'required_content_id',
  FreePPVBeginAt1 = 'free_ppv_period1_begin_at',
  FreePPVEndAt1 = 'free_ppv_period1_end_at',
  FreePPVBeginAt2 = 'free_ppv_period2_begin_at',
  FreePPVEndAt2 = 'free_ppv_period2_end_at',
  PublishBeginAt = 'publish_begin_at',
  PublishEndAt = 'publish_end_at',
  PayCoinBeginAt = 'pay_coin_only_begin_at',
  PayCoinEndAt = 'pay_coin_only_end_at'
}

type Content = any

export default Content
