import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import ContentsCampaign from '@src/models/comics/contentsCampaign'
import { mockCampaign } from './mockData/mockContent'

export const getContentsCampaignAjax = (
  campaignId: string
): Observable<{ status: number; response: ContentsCampaign }> => {
  authAjax.get('/campaign/content/' + campaignId)
  return from([
    {
      status: 200,
      response: mockCampaign
    }
  ])
}
