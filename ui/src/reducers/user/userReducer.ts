import { UserActionType, LoginResult } from './userActions'
import { AnyAction } from 'redux'
import { ActionType } from '../types'
import { StorageKey } from '../../common/storageKey'
import { setAuthHeader, removeAuthHeader } from '../../utils/ajaxUtil'

export interface UserState {
  isLogin: boolean
  profile?: {
    uid: string
    email: string
  }
}

const initState: UserState = {
  isLogin: false
}

const handler: Record<string, Function> = {
  [UserActionType.LOGIN_SUCCESS]: (state: UserState = initState, action: ActionType<LoginResult>) => {
    localStorage.setItem(StorageKey.LOGIN_TOKEN, action.payload.token)
    setAuthHeader(action.payload.token)
    return {
      ...state,
      isLogin: true,
      profile: action.payload
    }
  },
  [UserActionType.LOGOUT]: () => {
    localStorage.removeItem(StorageKey.LOGIN_TOKEN)
    removeAuthHeader()
    return initState
  }
}

export default function userReducer(state: UserState = initState, action: AnyAction) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
