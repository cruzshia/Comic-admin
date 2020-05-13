import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import HistoryBonusCoin from '@src/models/user/historyBonusCoin'
import { mockBonusCoinDetail, mockBonusCoinList } from './mockData/bonusCoinMockData'

export const getHistoryBonusCoinListAjax = (): Observable<{ status: number; response: HistoryBonusCoin[] }> => {
  authAjax.get('/user/history/bonus_coin/list')
  return from([
    {
      status: 200,
      response: mockBonusCoinList
    }
  ])
}

export const getHistoryBonusCoinAjax = (id: string): Observable<{ status: number; response: HistoryBonusCoin }> => {
  authAjax.get('/user/history/bonus_coin/' + id)
  return from([
    {
      status: 200,
      response: mockBonusCoinDetail
    }
  ])
}
