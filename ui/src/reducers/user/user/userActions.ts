import User, { UserExportLog } from '@src/models/user/user'

export enum UserActionType {
  GET_LIST = '@User/GET_LIST',
  GET_LIST_SUCCESS = '@User/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@User/GET_LIST_ERROR',

  GET_USER = '@User/GET_USER',
  GET_USER_SUCCESS = '@User/GET_USER_SUCCESS',
  GET_USER_ERROR = '@User/GET_USER_ERROR',

  GET_EXPORT_LOG_LIST = '@User/GET_EXPORT_LOG_LIST',
  GET_EXPORT_LOG_LIST_SUCCESS = '@User/GET_EXPORT_LOG_LIST_SUCCESS',
  GET_EXPORT_LOG_LIST_ERROR = '@User/GET_EXPORT_LOG_LIST_ERROR',

  CREATE = '@User/CREATE',
  CREATE_SUCCESS = '@User/CREATE_SUCCESS',
  CREATE_ERROR = '@User/CREATE_ERROR'
}

export const getUserListAction = () => ({
  type: UserActionType.GET_LIST
})

export const getUserListSuccessAction = (payload: User[]) => ({
  type: UserActionType.GET_LIST_SUCCESS,
  payload
})

export const getUserAction = (userId: string) => ({
  type: UserActionType.GET_USER,
  payload: userId
})

export const getUserSuccessAction = (user: User) => ({
  type: UserActionType.GET_USER_SUCCESS,
  payload: user
})

export const getUserExportLogListAction = () => ({
  type: UserActionType.GET_EXPORT_LOG_LIST
})

export const getUserExportLogListSuccessAction = (payload: UserExportLog[]) => ({
  type: UserActionType.GET_EXPORT_LOG_LIST_SUCCESS,
  payload
})

export const createUserAction = (user: User) => ({
  type: UserActionType.CREATE,
  payload: user
})

export const createUserSuccessAction = (user: User) => ({
  type: UserActionType.CREATE_SUCCESS,
  payload: user
})
