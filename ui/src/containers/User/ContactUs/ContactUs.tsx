import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContactUsList from './components/ContactUsList'
import ContactUsDetail from './components/ContactUsDetail'

export default function ContactUs() {
  return (
    <Switch>
      <Route exact path={routePath.user.contactUs} component={ContactUsList} />
      <Route exact path={routePath.user.contactUsDetail} component={ContactUsDetail} />
    </Switch>
  )
}
