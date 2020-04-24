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
import WorkModel from '@src/models/comics/work'
import WorkContext, { ActionContext } from './context/WorkContext'
import { StoreState } from '@src/reducers'
import {
  getWorkListAction,
  getWorkAction,
  createWorkAction,
  updateWorkAction,
  getCsvLogListAction
} from '@src/reducers/comics/work/workActions'

export default function Work() {
  const dispatch = useDispatch()
  const { workList, currentWork, importLogList } = useSelector((state: StoreState) => state.work)

  const handleGetWorkList = useCallback(() => dispatch(getWorkListAction()), [dispatch])
  const handleGetWork = useCallback((workId: string) => dispatch(getWorkAction(workId)), [dispatch])
  const handleCreateWork = useCallback((work: WorkModel) => dispatch(createWorkAction(work)), [dispatch])
  const handleUpdateWork = useCallback((work: WorkModel) => dispatch(updateWorkAction(work)), [dispatch])
  const handleGetCsvLogList = useCallback(() => dispatch(getCsvLogListAction()), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetWorkList: handleGetWorkList,
        onGetWork: handleGetWork,
        onCreateWork: handleCreateWork,
        onUpdateWork: handleUpdateWork,
        onGetCsvLogList: handleGetCsvLogList
      }}
    >
      <WorkContext.Provider
        value={{
          workList,
          currentWork,
          workTotal: workList.length,
          importLogList,
          logTotal: importLogList.length
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
