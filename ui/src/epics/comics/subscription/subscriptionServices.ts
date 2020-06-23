import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Subscription from '@src/models/comics/subscription'
import { Response } from '../../utils'
import { mockSubscriptionDetail } from './mockData/mockData'

const API_PATH = '/v1/subscriptions'
export const getSubscriptionListAjax = (): Response<Subscription[]> => authAjax.get(API_PATH)

export const getSubscriptionAjax = (subscriptionId: string): Response<Subscription> =>
  authAjax.get('/subscription/' + subscriptionId)

export const createSubscriptionAjax = (
  subscription: Subscription
): Observable<{ status: number; response: Subscription }> => {
  authAjax.post('/subscription', subscription)
  return from([
    {
      status: 200,
      response: mockSubscriptionDetail(subscription.id)
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
      response: mockSubscriptionDetail(subscription.id)
    }
  ])
}
