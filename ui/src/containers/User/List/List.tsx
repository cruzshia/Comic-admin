import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import UserEdit from './components/UserEdit'
import UserContext from './context/UserContext'
import { mockUserList, mockUser } from './mockData/mock'

export default function Comment() {
  return (
    <UserContext.Provider value={{ currentUser: mockUser, userList: mockUserList, userTotal: mockUserList.length }}>
      <Switch>
        <Route exact path={routePath.user.list} component={UserList} />
        <Route exact path={routePath.user.userDetail} component={UserDetail} />
        <Route exact path={routePath.user.userEdit} component={UserEdit} />
      </Switch>
    </UserContext.Provider>
  )
}
