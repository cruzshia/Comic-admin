import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { PushNotification } from '@src/models/application/pushNotification'
import { mockNotificationList } from './mockData/mockNotification'

export const getPushNotificationListAjax = (): Observable<{ status: number; response: PushNotification[] }> => {
  authAjax.get('/application/push_notification/list')
  return from([
    {
      status: 200,
      response: mockNotificationList.slice(0, Math.ceil(Math.random() * 7) + 1)
    }
  ])
}

export const deletePushNotificationAjax = (list: string[]): Observable<{ status: number }> => {
  authAjax.delete('/application/push_notification/list/delete', { list })
  return from([
    {
      status: 200
    }
  ])
}
