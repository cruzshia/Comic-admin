import { AdSetting, SettingType, AdSettingEdit } from './advertisement'
import App from './app'
import S3Info from '../s3Info'
import Image, { ImageInfo } from '../image'

export enum WorkSearchKeys {
  WorkKey = 'work_keyword',
  Author = 'author_keyword',
  WorkType = 'work_type',
  PublishBeginAtFrom = 'publish_begin_at_from',
  PublishBeginAtTo = 'publish_begin_at_to',
  PublishEndAtFrom = 'publish_end_at_from',
  PublishEndAtTo = 'publish_end_at_to',
  AdSetting = 'ads_in_viewer_setting',
  SerializedState = 'serialized_state',
  MagazineName = 'magazine_name',
  UpdateFrequency = 'update_frequency',
  FreePeriodicalDay = 'free_periodical_day_of_the_week',
  SubscriptionId = 'subscription_id',
  AppId = 'app_id'
}

export type SearchParam = {
  [key in WorkSearchKeys]: any
}

export enum WorkKeys {
  ID = 'id',
  App = 'apps',
  AppId = 'app_id',
  Title = 'title',
  TitleKana = 'title_kana',
  Description = 'description',
  Authors = 'authors',
  AuthorIds = 'author_ids',
  Subscription = 'subscription',
  SubscriptionId = 'subscription_id',
  WorkType = 'work_type',
  CreateAt = 'inserted_at',
  UpdateAt = 'updated_at',
  PublishBeginAt = 'publish_begin_at',
  PublishEndAt = 'publish_end_at',
  EpisodeWorkType = 'episode_work_type',
  UpdateFrequency = 'update_frequency',
  Images = 'images',
  MagazineName = 'magazine_name',
  FreePeriodicalDay = 'free_periodical_day_of_the_week',
  Filename = 'file_name',
  ReturnAdRevenue = 'return_ad_revenue',
  AdSetting = 'ads_in_viewer_setting',
  ImageUploadUrls = 'image_upload_urls',

  // for setting usage only
  SettingType = 'setting_type',
  AdSettingEdit = 'ad_setting_edit'
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

export enum RensaiStatus {
  Ongoing = 'ongoing',
  End = 'end',
  Rest = 'rest'
}

export interface Work {
  [WorkKeys.ID]: string
  [WorkKeys.Title]: string
  [WorkKeys.WorkType]: WorkType
  [WorkKeys.CreateAt]: string
  [WorkKeys.EpisodeWorkType]?: EpisodeWorkType
  [WorkKeys.UpdateFrequency]?: string
  [WorkKeys.Images]?: Image<ImageInfo>
}

export interface WorkDetail extends Work {
  [WorkKeys.TitleKana]?: string
  [WorkKeys.Description]: string
  [WorkKeys.App]: App[]
  [WorkKeys.AppId]: number
  [WorkKeys.Authors]: Author[]
  [WorkKeys.AuthorIds]?: string[]
  [WorkKeys.Subscription]?: Subscription
  [WorkKeys.SubscriptionId]?: string
  [WorkKeys.UpdateAt]: string
  [WorkKeys.PublishBeginAt]: string
  [WorkKeys.PublishEndAt]: string
  [WorkKeys.Filename]?: Image<string>
  [WorkKeys.MagazineName]?: string
  [WorkKeys.ReturnAdRevenue]?: boolean
  [WorkKeys.FreePeriodicalDay]?: string
  [WorkKeys.AdSetting]?: AdSetting[]
  [WorkKeys.ImageUploadUrls]?: Image<S3Info>

  // for form usage only
  [WorkKeys.SettingType]?: SettingType
  [WorkKeys.AdSettingEdit]?: AdSettingEdit
}

export interface Author {
  id: string
  name: string
}

export interface Subscription {
  id: string
  name: string
}

export default WorkDetail
