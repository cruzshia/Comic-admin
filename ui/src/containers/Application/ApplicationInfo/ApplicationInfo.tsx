import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getApplicationInfoListAction,
  createApplicationInfoAction,
  getApplicationInfoAction,
  updateApplicationInfoAction,
  resetApplicationInfoAction
} from '@src/reducers/application/applicationInfo/applicationInfoActions'
import ApplicationInfoList from './components/ApplicationInfoList'
import ApplicationInfoEdit from './components/ApplicationInfoEdit'
import ApplicationInfoDetail from './components/ApplicationInfoDetail'
import ApplicationInfoCreation from './components/ApplicationInfoCreation'
import ApplicationInfoContext, { ActionContext } from './context/ApplicationInfoContext'

export default function ApplicationInfo() {
  const dispatch = useDispatch()
  const { infoList, infoTotal, currentInfo } = useSelector((store: StoreState) => store.applicationInfo)
  const handleGetList = useCallback(() => dispatch(getApplicationInfoListAction()), [dispatch])
  const handleCreate = useCallback(data => dispatch(createApplicationInfoAction(data)), [dispatch])
  const handleGet = useCallback(id => dispatch(getApplicationInfoAction(id)), [dispatch])
  const handleUpdate = useCallback(data => dispatch(updateApplicationInfoAction(data)), [dispatch])
  const handleReset = useCallback(() => dispatch(resetApplicationInfoAction()), [dispatch])

  return (
    <Switch>
      <ActionContext.Provider
        value={{
          onGetApplicationInfoList: handleGetList,
          onCreateApplicationInfo: handleCreate,
          onGetApplicationInfo: handleGet,
          onUpdateApplicationInfo: handleUpdate,
          onResetApplicationInfo: handleReset
        }}
      >
        <ApplicationInfoContext.Provider value={{ infoList, infoTotal, currentInfo }}>
          <Route exact path={routePath.application.applicationInfo} component={ApplicationInfoList} />
          <Route exact path={routePath.application.applicationInfoEdit} component={ApplicationInfoEdit} />
          <Route exact path={routePath.application.applicationInfoCreation} component={ApplicationInfoCreation} />
          <Route exact path={routePath.application.applicationInfoDetail} component={ApplicationInfoDetail} />
        </ApplicationInfoContext.Provider>
      </ActionContext.Provider>
    </Switch>
  )
}
