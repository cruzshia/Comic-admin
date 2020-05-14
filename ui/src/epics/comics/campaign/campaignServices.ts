import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Campaign from '@src/models/comics/campaign'
import { mockCampaignList, mockCampaign, mockSubCampaignList } from './mockData/mockCampaign'

export const getCampaignListAjax = (): Observable<{ status: number; response: Campaign[] }> => {
  authAjax.get('/campaign/list')
  return from([
    {
      status: 200,
      response: mockCampaignList
    }
  ])
}

export const getCampaignAjax = (campaignId: string): Observable<{ status: number; response: Campaign }> => {
  authAjax.get('/campaign/' + campaignId)
  return from([
    {
      status: 200,
      response: mockCampaign
    }
  ])
}

export const getSubCampaignListAjax = (): Observable<{ status: number; response: Campaign[] }> => {
  authAjax.get('/campaign/sub/list')
  return from([
    {
      status: 200,
      response: mockSubCampaignList
    }
  ])
}

export const createCampaignAjax = (campaign: Campaign): Observable<{ status: number; response: Campaign }> => {
  authAjax.post('/campaign/', campaign)
  return from([
    {
      status: 200,
      response: mockCampaign
    }
  ])
}

export const updateCampaignAjax = (campaign: Campaign): Observable<{ status: number; response: Campaign }> => {
  authAjax.put('/campaign/', campaign)
  return from([
    {
      status: 200,
      response: mockCampaign
    }
  ])
}
