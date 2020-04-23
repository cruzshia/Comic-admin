import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'

interface AuthRouteProps extends RouteProps {
  authRequired?: boolean
  guestOnly?: boolean
}

export default function AuthRoute(props: PropsWithChildren<AuthRouteProps>) {
  const isLogin = useSelector((state: StoreState) => !!state.profile.token)
  const { authRequired, guestOnly, ...routeProps } = props
  if (authRequired && !isLogin) {
    return <Redirect to={routePath.login} />
  } else if (guestOnly && isLogin) {
    return <Redirect to={routePath.root} />
  }
  return <Route {...routeProps} />
}
