import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import WorkList from './components/WorkList'
import WorkCreation from './components/WorkCreation'
import WorkEdit from './components/WorkEdit'
import WorkDetail from './components/WorkDetail'
import WorkExport from './components/WorkExport'
import WorkImportLogs from './components/WorkImportLogs'
import WorkContext, { ActionContext } from './context/WorkContext'
import { StoreState } from '@src/reducers'
import { getWorkListAction, getWorkAction } from '@src/reducers/comics/work/workActions'
import { mockLogList } from './mockData/mockImportLogs'

export default function Work() {
  const dispatch = useDispatch()
  const { workList, currentWork } = useSelector((state: StoreState) => state.work)

  const handleGetWorkList = useCallback(() => dispatch(getWorkListAction()), [dispatch])
  const handleGetWork = useCallback((workId: string) => dispatch(getWorkAction(workId)), [dispatch])

  return (
    <ActionContext.Provider value={{ onGetWorkList: handleGetWorkList, onGetWork: handleGetWork }}>
      <WorkContext.Provider
        value={{
          workList,
          currentWork,
          workTotal: workList.length,
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
    </ActionContext.Provider>
  )
}
