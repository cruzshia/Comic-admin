import { AnyAction } from 'redux'
import Notification from '../../../models/user/notification'
import { NotificationActionType } from './notificationAction'

export interface NotificationState {
  notificationList: Notification[]
  currentNotification?: Notification
  notificationTotal: number
}

const initState: NotificationState = {
  notificationList: [],
  notificationTotal: 0
}
export const NotificationPreLoadState = initState

const updateCurrentNotification = (state: NotificationState, action: AnyAction) => ({
  ...state,
  currentNotification: action.payload
})
const handler: Record<string, (state: NotificationState, action: AnyAction) => Notification> = {
  [NotificationActionType.GET_LIST_SUCCESS]: (state: NotificationState, action: AnyAction) => ({
    ...state,
    notificationList: action.payload,
    notificationTotal: action.payload.length
  }),
  [NotificationActionType.GET_NOTIFY_SUCCESS]: updateCurrentNotification,
  [NotificationActionType.CREATE_SUCCUSS]: updateCurrentNotification,
  [NotificationActionType.UPDATE_SUCCUSS]: updateCurrentNotification,
  [NotificationActionType.RESET_NOTIFY]: updateCurrentNotification
}

export default function notificationReducer(state = initState, action: AnyAction) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
