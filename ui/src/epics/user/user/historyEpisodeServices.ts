import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import HistoryEpisode from '@src/models/user/historyEpisode'
import { mockEpisodePurchaseList, mockEpisodePurchaseDetail } from './mockData/episodePurchaseMockData'

export const getHistoryEpisodeListAjax = (): Observable<{ status: number; response: HistoryEpisode[] }> => {
  authAjax.get('/user/history/episode/list')
  return from([
    {
      status: 200,
      response: mockEpisodePurchaseList
    }
  ])
}

export const getHistoryEpisodeAjax = (id: string): Observable<{ status: number; response: HistoryEpisode }> => {
  authAjax.get('/user/history/episode' + id)
  return from([
    {
      status: 200,
      response: mockEpisodePurchaseDetail
    }
  ])
}
