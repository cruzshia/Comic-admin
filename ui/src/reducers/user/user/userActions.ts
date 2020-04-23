import User from '@src/models/user/user'

export enum UserActionType {
  GET_LIST = '@User/GET_LIST',
  GET_LIST_SUCCESS = '@User/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@User/GET_LIST_ERROR'
}

export const getUserListAction = () => ({
  type: UserActionType.GET_LIST
})

export const getUserListSuccessAction = (payload: User[]) => ({
  type: UserActionType.GET_LIST_SUCCESS,
  payload
})
