import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import PushNotification, { ListResponse, SearchParam } from '@src/models/application/pushNotification'
import { objToQueryStr } from '@src/utils/functions'
import { Response } from '../../utils'
import { mockNotificationList, mockNotification } from './mockData/mockNotification'

const PUSH_NOTIF_API_PATH = '/v1/push_notification'

export const getPushNotificationListAjax = (param?: SearchParam): Response<ListResponse> => {
  authAjax.get(PUSH_NOTIF_API_PATH + (param ? '?' + objToQueryStr(param) : ''))
  return from([
    {
      status: 200,
      response: { total_count: mockNotificationList.length, push_notifications: mockNotificationList }
    }
  ])
}

export const getPushNotificationAjax = (notificationId: string): Response<PushNotification> => {
  authAjax.get('/application/push_notification' + notificationId)
  return from([
    {
      status: 200,
      response: mockNotification
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

export const createPushNotificationAjax = (pushNotification: PushNotification): Response<PushNotification> => {
  authAjax.post('/application/push_notification/', pushNotification)
  return from([
    {
      status: 200,
      response: mockNotification
    }
  ])
}

export const updatePushNotificationAjax = (pushNotification: PushNotification): Response<PushNotification> => {
  authAjax.put('/application/push_notification', pushNotification)
  return from([
    {
      status: 200,
      response: mockNotification
    }
  ])
}
