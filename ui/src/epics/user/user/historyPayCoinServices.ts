import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import HistoryPayCoin from '@src/models/user/historyPayCoin'
import { mockPayCoinDetail, mockPayCoinList } from './mockData/payCoinMockData'

export const getHistoryPayCoinListAjax = (): Observable<{ status: number; response: HistoryPayCoin[] }> => {
  authAjax.get('/user/history/pay_coin/list')
  return from([
    {
      status: 200,
      response: mockPayCoinList
    }
  ])
}

export const getHistoryPayCoinAjax = (id: string): Observable<{ status: number; response: HistoryPayCoin }> => {
  authAjax.get('/user/history/pay_coin/' + id)
  return from([
    {
      status: 200,
      response: mockPayCoinDetail
    }
  ])
}
