import { Profile } from '@src/models/profile'
export enum ProfileActionType {
  LOGIN = '@Profile/LOGIN',
  LOGIN_SUCCESS = '@Profile/LOGIN_SUCCESS',
  LOGIN_ERROR = '@Profile/LOGIN_ERROR',
  LOGOUT = '@Profile/LOGOUT',

  GET_PROFILE = '@Profile/GET_PROFILE',
  GET_PROFILE_SUCCESS = '@Profile/GET_PROFILE_SUCCESS',
  GET_PROFILE_ERROR = '@Profile/GET_PROFILE_ERROR'
}

interface LoginPayload {
  email: string
  password: string
}

export const loginAction = (payload: LoginPayload) => ({
  type: ProfileActionType.LOGIN,
  payload
})

export interface LoginResult {
  token: string
}
export const loginSuccessAction = (payload: LoginResult) => ({
  type: ProfileActionType.LOGIN_SUCCESS,
  payload
})

export const logoutAction = () => ({
  type: ProfileActionType.LOGOUT
})

export const loginErrorAction = (error?: any) => ({
  type: ProfileActionType.LOGOUT,
  error
})

export const getProfileAction = () => ({
  type: ProfileActionType.GET_PROFILE
})

export const getProfileSuccessAction = (payload: Profile) => ({
  type: ProfileActionType.GET_PROFILE_SUCCESS,
  payload
})

export const getProfileErrorAction = (error?: any) => ({
  type: ProfileActionType.GET_PROFILE_ERROR,
  error
})
