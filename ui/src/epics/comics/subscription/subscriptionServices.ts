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

export const getSubscriptionAjax = (workId: string): Observable<{ status: number; response: Subscription }> => {
  authAjax.get('/subscription/' + workId)
  return from([
    {
      status: 200,
      response: mockSubscriptionDetail
    }
  ])
}
