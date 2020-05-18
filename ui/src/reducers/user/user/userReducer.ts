import User from '@src/models/user/user'
import ImportLog from '@src/models/importLog'
import { UserActionType } from './userActions'
import { ActionType } from '../../types'

export interface UserState {
  userList: User[]
  currentUser?: User
  csvExportLogs: ImportLog[]
  csvImportLogs: ImportLog[]
  exportLogsTotal: number
  importLogsTotal: number
}

const initState: UserState = {
  userList: [],
  csvExportLogs: [],
  csvImportLogs: [],
  exportLogsTotal: 0,
  importLogsTotal: 0
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
    action: ActionType<ImportLog[]>
  ): UserState => {
    return {
      ...state,
      csvExportLogs: action.payload,
      exportLogsTotal: action.payload.length
    }
  },
  [UserActionType.GET_IMPORT_LOG_LIST_SUCCESS]: (state: UserState, action: ActionType<ImportLog[]>): UserState => {
    return {
      ...state,
      csvImportLogs: action.payload,
      importLogsTotal: action.payload.length
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
