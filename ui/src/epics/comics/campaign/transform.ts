import { Campaign, CampaignKeys } from '@src/models/comics/campaign'
import { batchConvertDate, batchConvertISO8601 } from '@src/utils/functions'
import { WorksCampaign, WorksCampaignKeys } from '@src/models/comics/worksCampaign'

export const toRequestCampaign = (campaign: Campaign): Campaign =>
  batchConvertDate<Campaign>(campaign, [CampaignKeys.BeginAt, CampaignKeys.EndAt])

export const toCampaignModel = (campaign: Campaign): Campaign =>
  batchConvertISO8601<Campaign>(campaign, [CampaignKeys.BeginAt, CampaignKeys.EndAt])

export const toEditableWorkCampaign = ({ ...campaign }: WorksCampaign) => {
  campaign[WorksCampaignKeys.AppIds] = campaign[WorksCampaignKeys.Apps].map(app => app.id)
  return campaign
}
