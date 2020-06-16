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

export const getPushNotificationAjax = (notificationId: number): Response<PushNotification> => {
  authAjax.get(PUSH_NOTIF_API_PATH + '/' + notificationId)
  return from([
    {
      status: 200,
      response: mockNotification(notificationId)
    }
  ])
}

export const deletePushNotificationAjax = (list: string[]): Observable<{ status: number }> => {
  authAjax.delete(PUSH_NOTIF_API_PATH + 'delete', { list })
  return from([
    {
      status: 200
    }
  ])
}

export const createPushNotificationAjax = ({
  id,
  ...pushNotification
}: Partial<PushNotification>): Response<PushNotification> => {
  authAjax.post(PUSH_NOTIF_API_PATH, pushNotification)
  return from([
    {
      status: 200,
      response: mockNotification()
    }
  ])
}

export const updatePushNotificationAjax = ({
  id,
  ...pushNotification
}: Partial<PushNotification>): Response<PushNotification> => {
  authAjax.put(PUSH_NOTIF_API_PATH + '/' + String(id), pushNotification)
  return from([
    {
      status: 200,
      response: mockNotification(id)
    }
  ])
}
