import { PushNotification } from '@src/models/application/pushNotification'

export enum PushNotificationActionType {
  GET_LIST = '@AppPushNotification/GET_LIST',
  GET_LIST_SUCCESS = '@AppPushNotification/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@AppPushNotification/GET_LIST_ERROR',

  CREATE = '@AppPushNotification/CREATE',
  CREATE_SUCCESS = '@AppPushNotification/CREATE_SUCCESS',
  CREATE_ERROR = '@AppPushNotification/CREATE_ERROR',

  UPDATE = '@AppPushNotification/UPDATE',
  UPDATE_SUCCESS = '@AppPushNotification/UPDATE_SUCCESS',
  UPDATE_ERROR = '@AppPushNotification/UPDATE_ERROR',

  DELETE = '@AppPushNotification/DELETE',
  DELETE_SUCCESS = '@AppPushNotification/DELETE_SUCCESS',
  DELETE_ERROR = '@AppPushNotification/DELETE_ERROR',

  RESET_CURRENT = '@AppPushNotification/RESET_CURRENT'
}

export const getPushNotificationListAction = () => ({
  type: PushNotificationActionType.GET_LIST
})

export const getPushNotificationListSuccessAction = (payload: PushNotification[]) => ({
  type: PushNotificationActionType.GET_LIST_SUCCESS,
  payload
})

export const createPushNotificationAction = (pushNotification: PushNotification) => ({
  type: PushNotificationActionType.CREATE,
  payload: pushNotification
})

export const createPushNotificationSuccessAction = (pushNotification: PushNotification) => ({
  type: PushNotificationActionType.CREATE_SUCCESS,
  payload: pushNotification
})

export const updatePushNotificationAction = (pushNotification: PushNotification) => ({
  type: PushNotificationActionType.UPDATE,
  payload: pushNotification
})

export const updatePushNotificationSuccessAction = (pushNotification: PushNotification) => ({
  type: PushNotificationActionType.UPDATE_SUCCESS,
  payload: pushNotification
})

export const deletePushNotificationAction = (payload: string[]) => ({
  type: PushNotificationActionType.DELETE,
  payload
})

export const resetPushNotificationAction = () => ({
  type: PushNotificationActionType.RESET_CURRENT
})
