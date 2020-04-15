import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContactUsList from './components/ContactUsList'
import ContactUsDetail from './components/ContactUsDetail'
import { mockContactList } from './mockData/mockData'

export default function ContactUs() {
  return (
    <Switch>
      <Route
        exact
        path={routePath.user.contactUs}
        render={() => <ContactUsList contactList={mockContactList} contactTotal={mockContactList.length} />}
      />
      <Route exact path={routePath.user.contactUsDetail} component={ContactUsDetail} />
    </Switch>
  )
}
