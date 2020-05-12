import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import HistorySubscription from '@src/models/user/historySubscription'
import { mockSubscriptionList, mockSubscriptionDetail } from './mockData/subscriptionMockData'

export const getHistorySubscriptionListAjax = (): Observable<{ status: number; response: HistorySubscription[] }> => {
  authAjax.get('/user/history/subscription/list')
  return from([
    {
      status: 200,
      response: mockSubscriptionList
    }
  ])
}

export const getHistorySubscriptionAjax = (
  id: string
): Observable<{ status: number; response: HistorySubscription }> => {
  authAjax.get('/user/history/subscription' + id)
  return from([
    {
      status: 200,
      response: mockSubscriptionDetail
    }
  ])
}
