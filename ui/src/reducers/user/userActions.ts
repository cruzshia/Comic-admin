import { User } from '@src/models/userModel'
export enum UserActionType {
  LOGIN = '@User/LOGIN',
  LOGIN_SUCCESS = '@User/LOGIN_SUCCESS',
  LOGIN_ERROR = '@User/LOGIN_ERROR',
  LOGOUT = '@User/LOGOUT',

  GET_PROFILE = '@User/GET_PROFILE',
  GET_PROFILE_SUCCESS = '@User/GET_PROFILE_SUCCESS',
  GET_PROFILE_ERROR = '@User/GET_PROFILE_ERROR'
}

interface LoginPayload {
  email: string
  password: string
}

export const loginAction = (payload: LoginPayload) => ({
  type: UserActionType.LOGIN,
  payload
})

export interface LoginResult {
  token: string
}
export const loginSuccessAction = (payload: LoginResult) => ({
  type: UserActionType.LOGIN_SUCCESS,
  payload
})

export const logoutAction = () => ({
  type: UserActionType.LOGOUT
})

export const loginErrorAction = (error?: any) => ({
  type: UserActionType.LOGOUT,
  error
})

export const getProfileAction = () => ({
  type: UserActionType.GET_PROFILE
})

export const getProfileSuccessAction = (payload: User) => ({
  type: UserActionType.GET_PROFILE_SUCCESS,
  payload
})

export const getProfileErrorAction = (error?: any) => ({
  type: UserActionType.GET_PROFILE_ERROR,
  error
})
