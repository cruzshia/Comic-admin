import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../../reducers'
import { loginAction, logoutAction } from '../../reducers/user/userActions'
import LoginForm from './components/LoginForm'

export default function Login() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state: StoreState) => !!state.user.token)
  const onLogin = useCallback(
    () =>
      dispatch(
        loginAction({
          email: 'test email',
          password: 'password'
        })
      ),
    [dispatch]
  )

  const onLogout = useCallback(() => dispatch(logoutAction()), [dispatch])
  return <LoginForm onClick={isLogin ? onLogout : onLogin} title={isLogin ? 'logout' : 'login'} />
}
