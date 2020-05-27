import { AdSetting } from './advertisement'

export enum WorkSearchKeys {
  ID = 'id',
  Author = 'author_name',
  WorkType = 'work_type',
  PublishBeginAt = 'publish_begin_at',
  PublishEndAt = 'publish_end_at',
  AdSetting = 'ads_in_viewer_setting',
  SerializedState = 'serialized_state',
  MagazineName = 'magazine_name',
  UpdateFrequency = 'update_frequency',
  PeriodicalDay = 'periodical_day_of_the_week',
  SubscriptionId = 'subscription_id'
}

export enum WorkKeys {
  ID = 'id',
  Title = 'title',
  TitleKana = 'title_kana',
  Description = 'description',
  Authors = 'authors',
  Subscription = 'subscription',
  WorkType = 'work_type',
  CreateAt = 'inserted_at',
  UpdateAt = 'update_at',
  PublishBeginAt = 'publish_begin_at',
  PublishEndAt = 'publish_end_at',
  EpisodeWorkType = 'episode_work_type',
  UpdateFrequency = 'update_frequency',
  Images = 'images',
  MagazineName = 'magazine_name',
  ReturnAdRevenue = 'return_ad_revenue',
  AdSetting = 'ads_in_viewer_setting',
  S3Uploads = 's3_uploads'
}

export enum WorkType {
  Episode = 'episode',
  Comic = 'comic',
  Novel = 'novel',
  Magazine = 'magazine',
  Bonus = 'bonus'
}

export enum EpisodeWorkType {
  Original = 'original',
  OneShot = 'one_shot',
  Trial = 'look_inside',
  Campaign = 'campaign',
  Reprint = 'reprint',
  Rookie = 'rookie',
  Other = 'other'
}

export interface Work {
  [WorkKeys.ID]: string
  [WorkKeys.Title]: string
  [WorkKeys.WorkType]: WorkType
  [WorkKeys.CreateAt]: string
  [WorkKeys.EpisodeWorkType]?: EpisodeWorkType
  [WorkKeys.UpdateFrequency]?: string
  [WorkKeys.Images]?: string[]
}

export interface WorkImageMeta {
  path: string
  width: number
  height: number
}

export interface WorkDetail extends Work {
  [WorkKeys.TitleKana]?: string
  [WorkKeys.Description]: string
  [WorkKeys.Authors]: Author[]
  [WorkKeys.Subscription]?: Subscription
  [WorkKeys.UpdateAt]: string
  [WorkKeys.PublishBeginAt]: string
  [WorkKeys.PublishEndAt]: string
  [WorkKeys.MagazineName]?: string
  [WorkKeys.ReturnAdRevenue]?: string
  [WorkKeys.AdSetting]?: AdSetting
  [WorkKeys.S3Uploads]?: {
    image1: WorkImageMeta
    image2: WorkImageMeta
    image3: WorkImageMeta
    image4: WorkImageMeta
  }
}

export interface Author {
  id: string
  name: string
}

export interface Subscription {
  id: string
  name: string
}

type w = any
export default w
