import { AdSetting } from './advertisement'
import S3Info from '../s3Info'

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
  App = 'app',
  AppId = 'app_id',
  Title = 'title',
  TitleKana = 'title_kana',
  Description = 'description',
  Authors = 'authors',
  AuthorIds = 'author_ids',
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
  FreePeriodicalDay = 'free_periodical_day_of_the_week',
  Filename = 'file_name',
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
  [WorkKeys.Images]?: {
    image1_url: string
    image2_url: string
    image3_url: string
    image4_url: string
  }
}

export interface WorkImageMeta {
  path: string
  width: number
  height: number
}

export interface WorkDetail extends Work {
  [WorkKeys.TitleKana]?: string
  [WorkKeys.Description]: string
  [WorkKeys.App]: App
  [WorkKeys.AppId]: number
  [WorkKeys.Authors]: Author[]
  [WorkKeys.AuthorIds]?: string[]
  [WorkKeys.Subscription]?: Subscription
  [WorkKeys.UpdateAt]: string
  [WorkKeys.PublishBeginAt]: string
  [WorkKeys.PublishEndAt]: string
  [WorkKeys.Filename]?: Image<string>
  [WorkKeys.MagazineName]?: string
  [WorkKeys.ReturnAdRevenue]?: boolean
  [WorkKeys.FreePeriodicalDay]?: string
  [WorkKeys.AdSetting]?: AdSetting
  [WorkKeys.S3Uploads]?: Image<S3Info>
}

export interface Image<T> {
  image1: T
  image2: T
  image3: T
  image4: T
}

export interface App {
  id: number
  name: string
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
