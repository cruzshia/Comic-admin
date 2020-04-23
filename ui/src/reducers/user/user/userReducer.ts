import User from '@src/models/user/user'
import { UserActionType } from './userActions'
import { ActionType } from '../../types'

export interface UserState {
  userList: User[]
  currentUser?: User
}

const initState: UserState = {
  userList: []
}

export const UserPreloadState = initState

const handler: Record<string, (state: UserState, action: ActionType<any>) => UserState> = {
  [UserActionType.GET_LIST_SUCCESS]: (state: UserState = initState, action: ActionType<User[]>): UserState => {
    return {
      ...state,
      userList: action.payload
    }
  }
}

export default function workReducer(state: UserState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
