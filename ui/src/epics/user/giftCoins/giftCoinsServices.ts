import authAjax from '@src/utils/ajaxUtil'
import { mockList } from './mockData/mock'
import { from, Observable } from 'rxjs'
import { GiftCoinsCsvLog } from '@src/models/user/giftCoins'

export const getCsvLogListAjax: () => Observable<{ status: number; response: GiftCoinsCsvLog[] }> = () => {
  authAjax.get('/gift_coins/batch_logs')
  return from([
    {
      status: 200,
      response: mockList
    }
  ])
}
