import { UserActionType, LoginResult } from './userActions'
import { AnyAction } from 'redux'
import { ActionType } from '../types'
import { User } from '@src/model/userModel'
import { StorageKey } from '@src/common/storageKey'
import { setAuthHeader, removeAuthHeader } from '@src/utils/ajaxUtil'

export interface UserState {
  token?: string
  profile?: {
    id: string
    email: string
  }
}

const initState: UserState = {}

export const userPreloadState: UserState = {
  ...initState,
  token: localStorage.getItem(StorageKey.LOGIN_TOKEN) ?? undefined
}

const handler: Record<string, Function> = {
  [UserActionType.LOGIN_SUCCESS]: (state: UserState = initState, action: ActionType<LoginResult>): UserState => {
    localStorage.setItem(StorageKey.LOGIN_TOKEN, action.payload.token)
    setAuthHeader(action.payload.token)
    return {
      ...state,
      token: action.payload.token
    }
  },
  [UserActionType.LOGOUT]: (): UserState => {
    localStorage.removeItem(StorageKey.LOGIN_TOKEN)
    removeAuthHeader()
    return initState
  },
  [UserActionType.GET_PROFILE_SUCCESS]: (state: UserState = initState, action: ActionType<User>): UserState => {
    return {
      ...state,
      profile: action.payload
    }
  }
}

export default function userReducer(state: UserState = initState, action: AnyAction) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
