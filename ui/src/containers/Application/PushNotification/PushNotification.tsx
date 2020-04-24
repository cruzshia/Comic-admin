import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getPushNotificationListAction,
  deletePushNotificationAction,
  createPushNotificationAction
} from '@src/reducers/application/pushNotification/pushNotificationActions'
import { PushNotification as PushNotificationModel } from '@src/models/application/pushNotification'
import PushNotificationList from './components/PushNotificationList'
import PushNotificationEdit from './components/PushNotificationEdit'
import PushNotificationDetail from './components/PushNotificationDetail'
import PushNotificationCreation from './components/PushNotificationCreation'
import PushNotificationContext, { ActionContext } from './context/PushNotificationContext'
import { mockNotificationDetail } from '../../../epics/application/pushNotification/mockData/mockNotification'

export default function PushNotification() {
  const dispatch = useDispatch()
  const { notificationList } = useSelector((store: StoreState) => store.pushNotification)
  const handleGetList = useCallback(() => dispatch(getPushNotificationListAction()), [dispatch])
  const handleDelete = useCallback((list: string[]) => dispatch(deletePushNotificationAction(list)), [dispatch])
  const handleCreate = useCallback((data: PushNotificationModel) => dispatch(createPushNotificationAction(data)), [
    dispatch
  ])
  return (
    <Switch>
      <ActionContext.Provider
        value={{
          onGetPushNotificationList: handleGetList,
          onDeletePushNotification: handleDelete,
          onCreatePushNotification: handleCreate
        }}
      >
        <PushNotificationContext.Provider
          value={{
            notificationList: notificationList,
            notificationTotal: notificationList.length,
            currentNotification: mockNotificationDetail
          }}
        >
          <Route exact path={routePath.application.pushNotification} component={PushNotificationList} />
          <Route exact path={routePath.application.pushNotificationEdit} component={PushNotificationEdit} />
          <Route exact path={routePath.application.pushNotificationDetail} component={PushNotificationDetail} />
          <Route exact path={routePath.application.pushNotificationCreation} component={PushNotificationCreation} />
        </PushNotificationContext.Provider>
      </ActionContext.Provider>
    </Switch>
  )
}
