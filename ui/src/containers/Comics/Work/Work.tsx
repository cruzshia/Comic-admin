import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import WorkList from './components/WorkList'
import WorkCreation from './components/WorkCreation'
import WorkEdit from './components/WorkEdit'
import WorkDetail from './components/WorkDetail'
import WorkContext from './workContext'
import { mockWork } from './mockData/mockWork'
import { mockListData, mockWorkTotal } from './mockData/mockListData'

export default function Work() {
  return (
    <WorkContext.Provider value={{ workList: mockListData, currentWork: mockWork, workTotal: mockWorkTotal }}>
      <Switch>
        <Route exact path={routePath.comics.workCreation} component={WorkCreation} />
        <Route exact path={routePath.comics.workEdit} component={WorkEdit} />
        <Route exact path={routePath.comics.workDetail} component={WorkDetail} />
        <Route exact path={routePath.comics.work} component={WorkList} />
      </Switch>
    </WorkContext.Provider>
  )
}
