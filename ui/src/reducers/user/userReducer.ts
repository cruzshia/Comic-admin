import { UserActionType, LoginResult } from './userActions'
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
const cacheToken = localStorage.getItem(StorageKey.LOGIN_TOKEN) ?? undefined
cacheToken && setAuthHeader(cacheToken)

export const userPreloadState: UserState = {
  ...initState,
  token: cacheToken
}

const handler: Record<string, (state: UserState, action: ActionType<any>) => UserState> = {
  [UserActionType.LOGIN_SUCCESS]: (state: UserState = initState, action: ActionType<LoginResult>) => {
    localStorage.setItem(StorageKey.LOGIN_TOKEN, action.payload.token)
    setAuthHeader(action.payload.token)
    return {
      ...state,
      token: action.payload.token
    }
  },
  [UserActionType.LOGOUT]: () => {
    localStorage.removeItem(StorageKey.LOGIN_TOKEN)
    removeAuthHeader()
    return initState
  },
  [UserActionType.GET_PROFILE_SUCCESS]: (state: UserState = initState, action: ActionType<User>) => {
    return {
      ...state,
      profile: action.payload
    }
  }
}

export default function userReducer(state: UserState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
