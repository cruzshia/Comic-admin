import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import DisplaySetting from './DisplaySetting/DisplaySetting'
import CoinDeliveryEvent from './CoinDeliveryEvent/CoinDeliveryEvent'
import ApplicationInfo from './ApplicationInfo/ApplicationInfo'
import CoinProduct from './CoinProduct/CoinProduct'
import PushNotification from './PushNotification/PushNotification'

export default function Application() {
  return (
    <Switch>
      <Route path={routePath.application.displaySetting} component={DisplaySetting} />
      <Route path={routePath.application.coinDeliveryEvent} component={CoinDeliveryEvent} />
      <Route path={routePath.application.pushNotification} component={PushNotification} />
      <Route path={routePath.application.coinProduct} component={CoinProduct} />
      <Route path={routePath.application.applicationInfo} component={ApplicationInfo} />
    </Switch>
  )
}
