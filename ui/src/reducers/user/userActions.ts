export enum UserActionType {
  LOGIN = '@User/LOGIN',
  LOGIN_SUCCESS = '@User/LOGIN_SUCCESS',
  LOGIN_ERROR = '@User/LOGIN_ERROR',

  LOGOUT = '@User/LOGOUT'
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
  id: string
  email: string
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
