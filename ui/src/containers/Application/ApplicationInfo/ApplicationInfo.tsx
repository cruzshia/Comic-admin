import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import { getApplicationInfoListAction } from '@src/reducers/application/applicationInfo/applicationInfoActions'
import ApplicationInfoList from './components/ApplicationInfoList'
import ApplicationInfoEdit from './components/ApplicationInfoEdit'
import ApplicationInfoDetail from './components/ApplicationInfoDetail'
import ApplicationInfoCreation from './components/ApplicationInfoCreation'
import ApplicationInfoContext, { ActionContext } from './context/ApplicationInfoContext'
import { mockInfoDetail } from './mockData/mockApplicationInfo'

export default function ApplicationInfo() {
  const dispatch = useDispatch()
  const { infoList } = useSelector((store: StoreState) => store.applicationInfo)
  const handleGetList = useCallback(() => dispatch(getApplicationInfoListAction()), [dispatch])

  return (
    <Switch>
      <ActionContext.Provider value={{ onGetApplicationInfoList: handleGetList }}>
        <ApplicationInfoContext.Provider
          value={{ infoList: infoList, infoTotal: infoList.length, currentInfo: mockInfoDetail }}
        >
          <Route exact path={routePath.application.applicationInfo} component={ApplicationInfoList} />
          <Route exact path={routePath.application.applicationInfoEdit} component={ApplicationInfoEdit} />
          <Route exact path={routePath.application.applicationInfoCreation} component={ApplicationInfoCreation} />
          <Route exact path={routePath.application.applicationInfoDetail} component={ApplicationInfoDetail} />
        </ApplicationInfoContext.Provider>
      </ActionContext.Provider>
    </Switch>
  )
}
