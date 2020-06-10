import React, { useCallback } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import WorkList from './components/WorkList'
import WorkCreation from './components/WorkCreation'
import WorkEdit from './components/WorkEdit'
import WorkDetail from './components/WorkDetail'
import WorkExport from './components/WorkExport'
import WorkImportLogs from './components/WorkImportLogs'
import WorkImportCsv from './components/WorkImportCsv'
import WorkModel from '@src/models/comics/work'
import WorkContext, { ActionContext } from './context/WorkContext'
import { StoreState } from '@src/reducers'
import {
  getWorkListAction,
  getWorkAction,
  createWorkAction,
  updateWorkAction,
  getCsvLogListAction,
  resetWorkAction
} from '@src/reducers/comics/work/workActions'

export default function Work() {
  const dispatch = useDispatch()
  const { workList, workTotal, currentWork, importLogList, logTotal } = useSelector((state: StoreState) => state.work)

  const handleGetWorkList = useCallback((params?: Object) => dispatch(getWorkListAction(params)), [dispatch])
  const handleGetWork = useCallback((workId: string) => dispatch(getWorkAction(workId)), [dispatch])
  const handleCreateWork = useCallback((work: WorkModel) => dispatch(createWorkAction(work)), [dispatch])
  const handleUpdateWork = useCallback((work: WorkModel) => dispatch(updateWorkAction(work)), [dispatch])
  const handleGetCsvLogList = useCallback(() => dispatch(getCsvLogListAction()), [dispatch])
  const handleResetWork = useCallback(() => dispatch(resetWorkAction()), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetWorkList: handleGetWorkList,
        onGetWork: handleGetWork,
        onCreateWork: handleCreateWork,
        onUpdateWork: handleUpdateWork,
        onGetCsvLogList: handleGetCsvLogList,
        onResetWork: handleResetWork
      }}
    >
      <WorkContext.Provider
        value={{
          workList,
          currentWork,
          workTotal,
          importLogList,
          logTotal
        }}
      >
        <Switch>
          <Route exact path={routePath.comics.workCreation} component={WorkCreation} />
          <Route exact path={routePath.comics.workEdit} component={WorkEdit} />
          <Route exact path={routePath.comics.workDetail} component={WorkDetail} />
          <Route exact path={routePath.comics.workExport} component={WorkExport} />
          <Route exact path={routePath.comics.workImportLogs} component={WorkImportLogs} />
          <Route exact path={routePath.comics.workImportCsv} component={WorkImportCsv} />
          <Route exact path={routePath.comics.work} component={WorkList} />
          <Redirect to={routePath.comics.work} />
        </Switch>
      </WorkContext.Provider>
    </ActionContext.Provider>
  )
}
