import User, { UserExportLog } from '@src/models/user/user'
import { UserActionType } from './userActions'
import { ActionType } from '../../types'

export interface UserState {
  userList: User[]
  currentUser?: User
  csvExportLogs: UserExportLog[]
}

const initState: UserState = {
  userList: [],
  csvExportLogs: []
}

export const UserPreloadState = initState

const updateCurrentUserHandler = (state: UserState = initState, action: ActionType<User>): UserState => {
  return {
    ...state,
    currentUser: action.payload
  }
}

const handler: Record<string, (state: UserState, action: ActionType<any>) => UserState> = {
  [UserActionType.GET_LIST_SUCCESS]: (state: UserState = initState, action: ActionType<User[]>): UserState => {
    return {
      ...state,
      userList: action.payload
    }
  },
  [UserActionType.GET_EXPORT_LOG_LIST_SUCCESS]: (
    state: UserState = initState,
    action: ActionType<UserExportLog[]>
  ): UserState => {
    return {
      ...state,
      csvExportLogs: action.payload
    }
  },
  [UserActionType.GET_USER_SUCCESS]: updateCurrentUserHandler,
  [UserActionType.CREATE_SUCCESS]: updateCurrentUserHandler
}

export default function userReducer(state: UserState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
