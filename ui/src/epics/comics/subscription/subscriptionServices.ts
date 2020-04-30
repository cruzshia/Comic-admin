import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Subscription from '@src/models/comics/subscription'
import { mockSubscriptionList, mockSubscriptionDetail } from './mockData/mockData'

export const getSubscriptionListAjax = (): Observable<{ status: number; response: Subscription[] }> => {
  authAjax.get('/subscription/list')
  return from([
    {
      status: 200,
      response: mockSubscriptionList
    }
  ])
}

export const getSubscriptionAjax = (subscriptionId: string): Observable<{ status: number; response: Subscription }> => {
  authAjax.get('/subscription/' + subscriptionId)
  return from([
    {
      status: 200,
      response: mockSubscriptionDetail
    }
  ])
}

export const createSubscriptionAjax = (
  subscription: Subscription
): Observable<{ status: number; response: Subscription }> => {
  authAjax.post('/subscription', subscription)
  return from([
    {
      status: 200,
      response: mockSubscriptionDetail
    }
  ])
}

export const updateSubscriptionAjax = (
  subscription: Subscription
): Observable<{ status: number; response: Subscription }> => {
  authAjax.put('/subscription', subscription)
  return from([
    {
      status: 200,
      response: mockSubscriptionDetail
    }
  ])
}
