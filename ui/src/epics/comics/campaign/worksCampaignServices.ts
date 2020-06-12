import authAjax from '@src/utils/ajaxUtil'
import WorksCampaign from '@src/models/comics/worksCampaign'
import { Response } from '../../utils'

const API_PATH = '/v1/work_campaign'
export const getWorksCampaignAjax = (campaignId: string): Response<WorksCampaign> => {
  return authAjax.get(API_PATH + campaignId)
}
