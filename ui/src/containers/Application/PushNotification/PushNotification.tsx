import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getPushNotificationListAction,
  deletePushNotificationAction,
  createPushNotificationAction,
  getPushNotificationAction,
  updatePushNotificationAction
} from '@src/reducers/application/pushNotification/pushNotificationActions'
import PushNotificationModel, { SearchParam } from '@src/models/application/pushNotification'
import PushNotificationList from './components/PushNotificationList'
import PushNotificationEdit from './components/PushNotificationEdit'
import PushNotificationDetail from './components/PushNotificationDetail'
import PushNotificationCreation from './components/PushNotificationCreation'
import PushNotificationContext, { ActionContext } from './context/PushNotificationContext'

export default function PushNotification() {
  const dispatch = useDispatch()
  const { notificationList, notificationTotal, currentNotification } = useSelector(
    (store: StoreState) => store.pushNotification
  )
  const handleGetList = useCallback((param?: SearchParam) => dispatch(getPushNotificationListAction(param)), [dispatch])
  const handleDelete = useCallback((list: string[]) => dispatch(deletePushNotificationAction(list)), [dispatch])
  const handleCreate = useCallback(
    (data: Partial<PushNotificationModel>) => dispatch(createPushNotificationAction(data)),
    [dispatch]
  )
  const handleGetNotification = useCallback((id: string) => dispatch(getPushNotificationAction(id)), [dispatch])
  const handleUpdateNotification = useCallback(
    (data: Partial<PushNotificationModel>) => dispatch(updatePushNotificationAction(data)),
    [dispatch]
  )

  return (
    <Switch>
      <ActionContext.Provider
        value={{
          onGetPushNotificationList: handleGetList,
          onDeletePushNotification: handleDelete,
          onCreatePushNotification: handleCreate,
          onGetPushNotification: handleGetNotification,
          onUpdatePushNotification: handleUpdateNotification
        }}
      >
        <PushNotificationContext.Provider
          value={{
            notificationList,
            notificationTotal,
            currentNotification
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
