import Notification from '../../../models/user/notification'

export enum NotificationActionType {
  GET_LIST = '@UserNotification/GET_LIST',
  GET_LIST_SUCCESS = '@UserNotification/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@UserNotification/GET_LIST_ERROR',

  GET_NOTIFY = '@UserNotification/GET_NOTIFY',
  GET_NOTIFY_SUCCESS = '@UserNotification/GET_NOTIFY_SUCCESS',
  GET_NOTIFY_ERROR = '@UserNotification/GET_NOTIFY_ERROR',

  CREATE = '@UserNotification/CREATE',
  CREATE_SUCCUSS = '@UserNotification/CREATE_SUCCUSS',
  CREATE_ERROR = '@UserNotification/CREATE_ERROR',

  UPDATE = '@UserNotification/UPDATE',
  UPDATE_SUCCUSS = '@UserNotification/UPDATE_SUCCUSS',
  UPDATE_ERROR = '@UserNotification/UPDATE_ERROR',

  RESET_NOTIFY = '@UserNotification/RESET_NOTIFY'
}

export const getNotificationListAction = () => ({
  type: NotificationActionType.GET_LIST
})

export const getNotificationListSuccessAction = (payload: Notification[]) => ({
  type: NotificationActionType.GET_LIST_SUCCESS,
  payload
})

export const getNotificationAction = (id: string) => ({
  type: NotificationActionType.GET_NOTIFY,
  payload: id
})

export const getNotificationSuccessAction = (payload: Notification) => ({
  type: NotificationActionType.GET_NOTIFY_SUCCESS,
  payload
})

export const createNotificationAction = (payload: Notification) => ({
  type: NotificationActionType.CREATE,
  payload
})

export const createNotificationSuccessAction = (payload: Notification) => ({
  type: NotificationActionType.CREATE_SUCCUSS,
  payload
})

export const updateNotificationAction = (payload: Notification) => ({
  type: NotificationActionType.UPDATE,
  payload
})

export const updateNotificationSuccessAction = (payload: Notification) => ({
  type: NotificationActionType.UPDATE_SUCCUSS,
  payload
})

export const resetNotificationAction = () => ({
  type: NotificationActionType.RESET_NOTIFY
})
