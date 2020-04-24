import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import {
  getUserListAction,
  createUserAction,
  getUserAction,
  getUserExportLogListAction
} from '@src/reducers/user/user/userActions'
import { routePath } from '@src/common/appConfig'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import UserEdit from './components/UserEdit'
import UserExportLogs from './components/UserExportLogs'
import UserContext, { ActionContext } from './context/UserContext'
import History from './History/History'

export default function List() {
  const dispatch = useDispatch()
  const { userList, currentUser, csvExportLogs } = useSelector((state: StoreState) => state.user)
  const handleGetUserList = useCallback(() => dispatch(getUserListAction()), [dispatch])
  const handleGetUser = useCallback(id => dispatch(getUserAction(id)), [dispatch])
  const handleGetExportLogList = useCallback(() => dispatch(getUserExportLogListAction()), [dispatch])
  const handleCreateUser = useCallback(data => dispatch(createUserAction(data)), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetUserList: handleGetUserList,
        onCreateUser: handleCreateUser,
        onGetUser: handleGetUser,
        onGetUserExportLog: handleGetExportLogList
      }}
    >
      <UserContext.Provider
        value={{
          currentUser,
          userList,
          userTotal: userList.length,
          csvExportLogs: csvExportLogs,
          csvLogsTotal: csvExportLogs.length
        }}
      >
        <Switch>
          <Route exact path={routePath.user.list} component={UserList} />
          <Route exact path={routePath.user.userDetail} component={UserDetail} />
          <Route exact path={routePath.user.userEdit} component={UserEdit} />
          <Route exact path={routePath.user.userExportLogs} component={UserExportLogs} />
        </Switch>
      </UserContext.Provider>
      <Route path={routePath.user.history} component={History} />
    </ActionContext.Provider>
  )
}
