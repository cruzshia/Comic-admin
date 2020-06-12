import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import CoinDeliveryEvent from '@src/models/application/coinDeliveryEvent'
import { ListParams } from '@src/reducers/application/coinDeliveryEvent/coinDeliveryEventActions'
import { objToQueryStr } from '@src/utils/functions'
import { Response } from '../../utils'
import { mockEventDetail } from './mockData/mockCoinDeliveryEvent'

const API_PATH = '/v1/coin_grant_events'
export const getCoinDeliveryEventListAjax = (params?: object): Response<ListParams> => {
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
