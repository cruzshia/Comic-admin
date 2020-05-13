import { Observable, from } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import Notification from '@src/models/user/notification'
import { mockNotificationList, mockNotification } from './mockData/mock'

export const getListAjax = (): Observable<{ status: number; response: Notification[] }> => {
  authAjax.get('/notification/list')
  return from([
    {
      status: 200,
      response: mockNotificationList
    }
  ])
}

export const getNotificationAjax = (id: string): Observable<{ status: number; response: Notification }> => {
  authAjax.get('/notification/' + id)
  return from([
    {
      status: 200,
      response: mockNotification
    }
  ])
}

export const createAjax = (data: Notification): Observable<{ status: number; response: Notification }> => {
  authAjax.post('/notification', data)
  return from([
    {
      status: 200,
      response: mockNotification
    }
  ])
}

export const updateAjax = (data: Notification): Observable<{ status: number; response: Notification }> => {
  authAjax.put('/notification', data)
  return from([
    {
      status: 200,
      response: mockNotification
    }
  ])
}
