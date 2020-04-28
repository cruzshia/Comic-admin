import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { CoinDeliveryEvent } from '@src/models/application/coinDeliveryEvent'
import { mockEventList, mockEventDetail } from './mockData/mockCoinDeliveryEvent'

export const getCoinDeliveryEventListAjax = (): Observable<{ status: number; response: CoinDeliveryEvent[] }> => {
  authAjax.get('/application/coin_delivery_event')
  return from([
    {
      status: 200,
      response: mockEventList
    }
  ])
}

export const getCoinDeliveryEventAjax = (id: string): Observable<{ status: number; response: CoinDeliveryEvent }> => {
  authAjax.get(`/application/coin_delivery_event/${id}`)
  return from([
    {
      status: 200,
      response: mockEventDetail
    }
  ])
}

export const createCoinDeliveryEventAjax = (
  data: CoinDeliveryEvent
): Observable<{ status: number; response: CoinDeliveryEvent }> => {
  authAjax.post('/application/coin_delivery_event', data)
  return from([
    {
      status: 200,
      response: mockEventDetail
    }
  ])
}

export const updateCoinDeliveryEventAjax = (
  data: CoinDeliveryEvent
): Observable<{ status: number; response: CoinDeliveryEvent }> => {
  authAjax.put('/application/coin_delivery_event', data)
  return from([
    {
      status: 200,
      response: mockEventDetail
    }
  ])
}
