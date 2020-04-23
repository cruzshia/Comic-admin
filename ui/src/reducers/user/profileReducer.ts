import { ProfileActionType, LoginResult } from './profileActions'
import { ActionType } from '../types'
import { Profile } from '@src/models/profile'
import { StorageKey } from '@src/common/storageKey'
import { setAuthHeader, removeAuthHeader } from '@src/utils/ajaxUtil'

export interface ProfileState {
  token?: string
  profile?: {
    id: string
    email: string
  }
}

const initState: ProfileState = {}
const cacheToken = localStorage.getItem(StorageKey.LOGIN_TOKEN) ?? undefined
cacheToken && setAuthHeader(cacheToken)

export const ProfilePreloadState: ProfileState = {
  ...initState,
  token: cacheToken
}

const handler: Record<string, (state: ProfileState, action: ActionType<any>) => ProfileState> = {
  [ProfileActionType.LOGIN_SUCCESS]: (state: ProfileState = initState, action: ActionType<LoginResult>) => {
    localStorage.setItem(StorageKey.LOGIN_TOKEN, action.payload.token)
    setAuthHeader(action.payload.token)
    return {
      ...state,
      token: action.payload.token
    }
  },
  [ProfileActionType.LOGOUT]: () => {
    localStorage.removeItem(StorageKey.LOGIN_TOKEN)
    removeAuthHeader()
    return initState
  },
  [ProfileActionType.GET_PROFILE_SUCCESS]: (state: ProfileState = initState, action: ActionType<Profile>) => {
    return {
      ...state,
      profile: action.payload
    }
  }
}

export default function userReducer(state: ProfileState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
