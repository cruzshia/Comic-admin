import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import WorksCampaign from '@src/models/comics/worksCampaign'
import { mockCampaign } from './mockData/mockCampaign'

export const getWorksCampaignAjax = (campaignId: string): Observable<{ status: number; response: WorksCampaign }> => {
  authAjax.get('/campaign/work/' + campaignId)
  return from([
    {
      status: 200,
      response: mockCampaign
    }
  ])
}
