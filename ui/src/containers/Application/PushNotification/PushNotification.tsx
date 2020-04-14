import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import PushNotificationList from './components/PushNotificationList'
import PushNotificationEdit from './components/PushNotificationEdit'
import PushNotificationDetail from './components/PushNotificationDetail'
import PushNotificationCreation from './components/PushNotificationCreation'
import PushNotificationContext from './context/PushNotificationContext'
import { mockNotificationDetail, mockNotificationList, mockNotificationTotal } from './mockData/mockNotification'

export default function PushNotification() {
  return (
    <Switch>
      <PushNotificationContext.Provider
        value={{
          notificationList: mockNotificationList,
          notificationTotal: mockNotificationTotal,
          currentNotification: mockNotificationDetail
        }}
      >
        <Route exact path={routePath.application.pushNotification} component={PushNotificationList} />
        <Route exact path={routePath.application.pushNotificationEdit} component={PushNotificationEdit} />
        <Route exact path={routePath.application.pushNotificationDetail} component={PushNotificationDetail} />
        <Route exact path={routePath.application.pushNotificationCreation} component={PushNotificationCreation} />
      </PushNotificationContext.Provider>
    </Switch>
  )
}
