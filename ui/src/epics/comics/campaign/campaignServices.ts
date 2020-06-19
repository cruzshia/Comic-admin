import { from } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { Campaign, CampaignKeys } from '@src/models/comics/campaign'
import { CampaignListParams, CampaignSubListParams } from '@src/reducers/comics/campaign/campaignActions'
import { objToQueryStr } from '@src/utils/functions'
import Paging from '@src/models/paging'
import { mockCampaign } from './mockData/mockCampaign'
import { Response } from '../../utils'

const CAMPAIGNS_API_PATH = '/v1/campaigns'
const CAMPAIGN_API_PATH = '/v1/campaign'

export const getCampaignListAjax = (params?: Object): Response<CampaignListParams> =>
  authAjax.get(CAMPAIGNS_API_PATH + (params ? '?' + objToQueryStr(params) : ''))

export const getCampaignAjax = (campaignId: string): Response<Campaign> =>
  authAjax.get(`${CAMPAIGN_API_PATH}/${campaignId}`)

export const getAssociatedCampaignListAjax = (campaignId: string, query: Paging): Response<CampaignSubListParams> =>
  authAjax.get(`${CAMPAIGN_API_PATH}/${campaignId}/associated_campaigns${query ? '?' + objToQueryStr(query) : ''}`)

export const createCampaignAjax = (campaign: Partial<Campaign>): Response<Campaign> => {
  authAjax.post('/campaign/', campaign)
  return from([
    {
      status: 200,
      response: mockCampaign
    }
  ])
}

export const updateCampaignAjax = (campaign: Campaign): Response<Campaign> =>
  authAjax.put(CAMPAIGN_API_PATH + campaign[CampaignKeys.ID], campaign)
