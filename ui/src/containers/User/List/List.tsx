import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { getUserListAction } from '@src/reducers/user/user/userActions'
import { routePath } from '@src/common/appConfig'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import UserEdit from './components/UserEdit'
import UserExportLogs from './components/UserExportLogs'
import UserContext, { ActionContext } from './context/UserContext'
import History from './History/History'
import { mockUser, mockCsvExportLogs, mockCsvLogsTotal } from './mockData/mock'

export default function List() {
  const dispatch = useDispatch()
  const { userList } = useSelector((state: StoreState) => state.user)
  const handleGetUserList = useCallback(() => dispatch(getUserListAction()), [dispatch])

  return (
    <ActionContext.Provider value={{ onGetUserList: handleGetUserList }}>
      <UserContext.Provider
        value={{
          currentUser: mockUser,
          userList,
          userTotal: userList.length,
          csvExportLogs: mockCsvExportLogs,
          csvLogsTotal: mockCsvLogsTotal
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
