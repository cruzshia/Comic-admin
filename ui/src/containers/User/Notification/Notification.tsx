import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotificationList from './components/NotificationList'
import NotificationDetail from './components/NotificationDetail'
import NotificationEdit from './components/NotificationEdit'
import NotificationCreation from './components/NotificationCreation'
import { routePath } from '@src/common/appConfig'
import NotificationContext from './context/NotificationContext'
import { mockNotificationList, mockNotification } from './mockData/mock'

export default function Notification() {
  return (
    <>
      <NotificationContext.Provider
        value={{
          notificationList: mockNotificationList,
          notificationTotal: mockNotificationList.length,
          currentNotification: mockNotification
        }}
      >
        <Switch>
          <Route exact path={routePath.user.notificationDetail} component={NotificationDetail}></Route>
          <Route exact path={routePath.user.notificationEdit} component={NotificationEdit}></Route>
          <Route exact path={routePath.user.notificationCreation} component={NotificationCreation}></Route>
          <Route exact path={routePath.user.notification} component={NotificationList}></Route>
        </Switch>
      </NotificationContext.Provider>
    </>
  )
}
