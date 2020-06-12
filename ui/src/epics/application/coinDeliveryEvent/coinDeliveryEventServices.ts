import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import CoinDeliveryEvent from '@src/models/application/coinDeliveryEvent'
import { objToQueryStr } from '@src/utils/functions'
import { mockEventDetail } from './mockData/mockCoinDeliveryEvent'

const API_PATH = '/v1/coin_grant_events'
export const getCoinDeliveryEventListAjax = (
  params?: object
): Observable<{ status: number; response: CoinDeliveryEvent[] }> => {
  return authAjax.get(API_PATH + (params ? '?' + objToQueryStr(params) : ''))
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
