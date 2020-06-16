import App from './app'
import Image, { ImageInfo } from '../image'
import S3Info from '../s3Info'
import { AdSetting } from './advertisement'

export enum WorksCampaignKeys {
  ID = 'id',
  CampaignID = 'campaign_id',
  Name = 'name',
  WorkId = 'work_id',
  WorkName = 'work_name',
  Apps = 'apps',
  AppIds = 'app_ids',
  InsertedAt = 'inserted_at',
  UpdatedAt = 'updated_at',
  BeginAt = 'begin_at',
  EndAt = 'end_at',
  Priority = 'priority',
  Images = 'images',
  Description = 'description',
  FreeRange = 'free_range',
  FreeRangeDisplay = 'free_range_display_string',
  AdSetting = 'ads_in_viewer_setting',
  S3Uploads = 's3_uploads'
}

export interface WorksCampaign {
  [WorksCampaignKeys.ID]: number
  [WorksCampaignKeys.Name]: string
  [WorksCampaignKeys.WorkName]?: string
  [WorksCampaignKeys.WorkId]: string
  [WorksCampaignKeys.Apps]: App[]
  [WorksCampaignKeys.AppIds]?: number[]
  [WorksCampaignKeys.InsertedAt]: string
  [WorksCampaignKeys.UpdatedAt]: string
  [WorksCampaignKeys.BeginAt]: string
  [WorksCampaignKeys.EndAt]: string
  [WorksCampaignKeys.Priority]: number
  [WorksCampaignKeys.Images]?: Image<ImageInfo>
  [WorksCampaignKeys.Description]: string
  [WorksCampaignKeys.FreeRange]?: string
  [WorksCampaignKeys.FreeRangeDisplay]?: string
  [WorksCampaignKeys.AdSetting]?: AdSetting[]
  [WorksCampaignKeys.S3Uploads]?: S3Info[]
}

export interface WorkCampaignCreate
  extends Omit<
    WorksCampaign,
    WorksCampaignKeys.Apps | WorksCampaignKeys.InsertedAt | WorksCampaignKeys.UpdatedAt | WorksCampaignKeys.WorkName
  > {
  [WorksCampaignKeys.AppIds]: number[]
  [WorksCampaignKeys.CampaignID]: number
}
