export enum CampaignSearchKeys {
  Name = 'name',
  BeginAtFrom = 'begin_at_from',
  BeginAtTo = 'begin_at_to',
  EndAtFrom = 'end_at_from',
  EndAtTo = 'end_at_to'
}

export type SearchParam = {
  [key in CampaignSearchKeys]: any
}

export enum CampaignKeys {
  ID = 'id',
  Name = 'name',
  BeginAt = 'begin_at',
  EndAt = 'end_at',
  InsertedAt = 'inserted_at',
  UpdateAt = 'update_at',
  Note = 'note'
}

export interface Campaign {
  [CampaignKeys.ID]: number
  [CampaignKeys.Name]: string
  [CampaignKeys.BeginAt]: string
  [CampaignKeys.EndAt]: string
  [CampaignKeys.InsertedAt]?: string
  [CampaignKeys.UpdateAt]: string
  [CampaignKeys.Note]?: string
}

export enum AssociatedCampaignKeys {
  Id = 'id',
  CampaignType = 'campaign_type',
  Name = 'name',
  CampaignTarget = 'campaign_target',
  BeginAt = 'begin_at',
  EndAt = 'end_at'
}

export enum CampaignType {
  WorkCampaign = 'work_campaign',
  ContentCampaign = 'content_campaign'
}
export interface AssociatedCampaign {
  [AssociatedCampaignKeys.Id]: number
  [AssociatedCampaignKeys.CampaignType]: CampaignType
  [AssociatedCampaignKeys.Name]: string
  [AssociatedCampaignKeys.CampaignTarget]: string
  [AssociatedCampaignKeys.BeginAt]: string
  [AssociatedCampaignKeys.EndAt]: string
}
