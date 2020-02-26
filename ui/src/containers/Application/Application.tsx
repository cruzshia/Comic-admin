import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ApplicationList from './List/ApplicationList'
import AppScreen from './AppScreen/AppScreen'
import Advertisement from './Advertisement/Advertisement'
import Announcement from './Announcement/Announcement'
import CoinProduct from './CoinProduct/CoinProduct'
import PushNotification from './PushNotification/PushNotification'
import Questionnaire from './Questionnaire/Questionnaire'
import CustomerService from './CustomerService/CustomerService'
import Campaign from './Campaign/Campaign'

export default function Application() {
  return (
    <>
      <Switch>
        <Route path={routePath.application.list} component={ApplicationList} />
        <Route path={routePath.application.appScreen} component={AppScreen} />
        <Route path={routePath.application.advertisement} component={Advertisement} />
        <Route path={routePath.application.announcement} component={Announcement} />
        <Route path={routePath.application.coinProduct} component={CoinProduct} />
        <Route path={routePath.application.pushNotification} component={PushNotification} />
        <Route path={routePath.application.questionnaire} component={Questionnaire} />
        <Route path={routePath.application.customerService} component={CustomerService} />
        <Route path={routePath.application.campaign} component={Campaign} />
      </Switch>
    </>
  )
}
