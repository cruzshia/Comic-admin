import PushNotification, { ListResponse } from '@src/models/application/pushNotification'
import { PushNotificationActionType } from './pushNotificationActions'
import { ActionType } from '../../types'

export interface PushNotificationState {
  notificationList: PushNotification[]
  notificationTotal: number
  currentNotification?: PushNotification
}

const initState: PushNotificationState = {
  notificationList: [],
  notificationTotal: 0
}

export const emptyPushNotification: Partial<PushNotification> = {}

export const PushNotificationPreloadState = initState

const updateCurrentNotificationHandler = (
  state: PushNotificationState,
  action: ActionType<PushNotification | undefined>
): PushNotificationState => {
  return {
    ...state,
    currentNotification: action.payload
  }
}

const handler: Record<string, (state: PushNotificationState, action: ActionType<any>) => PushNotificationState> = {
  [PushNotificationActionType.GET_LIST_SUCCESS]: (
    state: PushNotificationState,
    action: ActionType<ListResponse>
  ): PushNotificationState => {
    return {
      ...state,
      notificationList: action.payload.push_notifications,
      notificationTotal: action.payload.total_count
    }
  },
  [PushNotificationActionType.RESET_CURRENT]: updateCurrentNotificationHandler,
  [PushNotificationActionType.CREATE_SUCCESS]: updateCurrentNotificationHandler,
  [PushNotificationActionType.GET_NOTIFICATION_SUCCESS]: updateCurrentNotificationHandler,
  [PushNotificationActionType.UPDATE_SUCCESS]: updateCurrentNotificationHandler
}

export default function pushNotificationReducer(state: PushNotificationState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
