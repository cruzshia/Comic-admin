import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { PushNotification } from '@src/models/application/pushNotification'
import { mockNotificationList, mockNotification } from './mockData/mockNotification'

export const getPushNotificationListAjax = (): Observable<{ status: number; response: PushNotification[] }> => {
  authAjax.get('/application/push_notification/list')
  return from([
    {
      status: 200,
      response: mockNotificationList
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

export const createPushNotificationAjax = (
  pushNotification: PushNotification
): Observable<{ status: number; response: PushNotification }> => {
  authAjax.post('/application/push_notification/', pushNotification)
  return from([
    {
      status: 200,
      response: mockNotification
    }
  ])
}
