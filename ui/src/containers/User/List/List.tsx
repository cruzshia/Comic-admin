import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import UserEdit from './components/UserEdit'
import UserExportLogs from './components/UserExportLogs'
import UserContext from './context/UserContext'
import { mockUserList, mockUser, mockCsvExportLogs, mockCsvLogsTotal } from './mockData/mock'

export default function Comment() {
  return (
    <UserContext.Provider
      value={{
        currentUser: mockUser,
        userList: mockUserList,
        userTotal: mockUserList.length,
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
  )
}
