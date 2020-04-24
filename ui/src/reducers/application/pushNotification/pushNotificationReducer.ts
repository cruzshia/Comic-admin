import { PushNotification } from '@src/models/application/pushNotification'
import { PushNotificationActionType } from './pushNotificationActions'
import { ActionType } from '../../types'

export interface PushNotificationState {
  notificationList: PushNotification[]
  currentNotification?: PushNotification
}

const initState: PushNotificationState = {
  notificationList: []
}

export const emptyNotification: PushNotification = {}

export const PushNotificationPreloadState = initState

const handler: Record<string, (state: PushNotificationState, action: ActionType<any>) => PushNotificationState> = {
  [PushNotificationActionType.GET_LIST_SUCCESS]: (
    state: PushNotificationState,
    action: ActionType<PushNotification[]>
  ): PushNotificationState => {
    return {
      ...state,
      notificationList: action.payload
    }
  },
  [PushNotificationActionType.CREATE_SUCCESS]: (
    state: PushNotificationState,
    action: ActionType<PushNotification[]>
  ): PushNotificationState => {
    return {
      ...state,
      currentNotification: action.payload
    }
  }
}

export default function pushNotificationReducer(state: PushNotificationState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
