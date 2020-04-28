import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getNotificationListAction,
  getNotificationAction,
  createNotificationAction,
  resetNotificationAction
} from '@src/reducers/user/notification/notificationAction'
import NotificationContext, { ActionContext } from './context/NotificationContext'
import NotificationList from './components/NotificationList'
import NotificationDetail from './components/NotificationDetail'
import NotificationEdit from './components/NotificationEdit'
import NotificationCreation from './components/NotificationCreation'

export default function Notification() {
  const dispatch = useDispatch()
  const { notificationList, currentNotification, notificationTotal } = useSelector(
    (state: StoreState) => state.notification
  )

  const handleGetNotificationList = useCallback(() => dispatch(getNotificationListAction()), [dispatch])
  const handleGetNotification = useCallback(id => dispatch(getNotificationAction(id)), [dispatch])
  const handleCreateNotification = useCallback(data => dispatch(createNotificationAction(data)), [dispatch])
  const handleResetNotification = useCallback(() => dispatch(resetNotificationAction()), [dispatch])
  return (
    <>
      <ActionContext.Provider
        value={{
          onGetNotificationList: handleGetNotificationList,
          onGetNotification: handleGetNotification,
          onCreateNotification: handleCreateNotification,
          onResetNotification: handleResetNotification
        }}
      >
        <NotificationContext.Provider
          value={{
            notificationList,
            notificationTotal,
            currentNotification
          }}
        >
          <Switch>
            <Route exact path={routePath.user.notificationDetail} component={NotificationDetail}></Route>
            <Route exact path={routePath.user.notificationEdit} component={NotificationEdit}></Route>
            <Route exact path={routePath.user.notificationCreation} component={NotificationCreation}></Route>
            <Route exact path={routePath.user.notification} component={NotificationList}></Route>
          </Switch>
        </NotificationContext.Provider>
      </ActionContext.Provider>
    </>
  )
}
