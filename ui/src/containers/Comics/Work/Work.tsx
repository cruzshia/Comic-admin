import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import WorkList from './components/WorkList'
import WorkCreation from './components/WorkCreation'
import WorkEdit from './components/WorkEdit'
import WorkDetail from './components/WorkDetail'
import WorkExport from './components/WorkExport'
import WorkImportLogs from './components/WorkImportLogs'
import WorkContext from './context/WorkContext'
import { mockWork } from './mockData/mockWork'
import { mockListData } from './mockData/mockListData'
import { mockLogList } from './mockData/mockImportLogs'

export default function Work() {
  return (
    <WorkContext.Provider
      value={{
        workList: mockListData,
        currentWork: mockWork,
        workTotal: mockListData.length,
        importLogList: mockLogList,
        logTotal: mockLogList.length
      }}
    >
      <Switch>
        <Route exact path={routePath.comics.workCreation} component={WorkCreation} />
        <Route exact path={routePath.comics.workEdit} component={WorkEdit} />
        <Route exact path={routePath.comics.workDetail} component={WorkDetail} />
        <Route exact path={routePath.comics.workExport} component={WorkExport} />
        <Route exact path={routePath.comics.workImportLogs} component={WorkImportLogs} />
        <Route exact path={routePath.comics.work} component={WorkList} />
      </Switch>
    </WorkContext.Provider>
  )
}
