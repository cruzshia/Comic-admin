import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { CoinDeliveryEvent } from '@src/models/application/coinDeliveryEvent'
import { mockEventList } from './mockData/mockCoinDeliveryEvent'

export const getCoinDeliveryEventListAjax = (): Observable<{ status: number; response: CoinDeliveryEvent[] }> => {
  authAjax.get('/application/coin_delivery_event')
  return from([
    {
      status: 200,
      response: mockEventList
    }
  ])
}
