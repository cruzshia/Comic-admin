import authAjax, { JSON_CONTENT } from '@src/utils/ajaxUtil'
import { WorksCampaign, WorkCampaignCreate } from '@src/models/comics/worksCampaign'
import { Response } from '../../utils'

const API_PATH = '/v1/work_campaign'
export const getWorksCampaignAjax = (campaignId: string): Response<WorksCampaign> => {
  return authAjax.get(API_PATH + '/' + campaignId)
}

export const createWorksCampaignAjax = (campaign: WorkCampaignCreate): Response<WorksCampaign> => {
  return authAjax.post(API_PATH, campaign, { ...JSON_CONTENT })
}
