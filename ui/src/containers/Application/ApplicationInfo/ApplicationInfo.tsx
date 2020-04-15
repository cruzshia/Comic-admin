import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ApplicationInfoList from './components/ApplicationInfoList'
import ApplicationInfoEdit from './components/ApplicationInfoEdit'
import ApplicationInfoDetail from './components/ApplicationInfoDetail'
import ApplicationInfoCreation from './components/ApplicationInfoCreation'
import ApplicationInfoContext from './context/ApplicationInfoContext'
import { mockInfoDetail, mockInfoList } from './mockData/mockApplicationInfo'

export default function ApplicationInfo() {
  return (
    <Switch>
      <ApplicationInfoContext.Provider
        value={{ infoList: mockInfoList, infoTotal: mockInfoList.length, currentInfo: mockInfoDetail }}
      >
        <Route exact path={routePath.application.applicationInfo} component={ApplicationInfoList} />
        <Route exact path={routePath.application.applicationInfoEdit} component={ApplicationInfoEdit} />
        <Route exact path={routePath.application.applicationInfoCreation} component={ApplicationInfoCreation} />
        <Route exact path={routePath.application.applicationInfoDetail} component={ApplicationInfoDetail} />
      </ApplicationInfoContext.Provider>
    </Switch>
  )
}
