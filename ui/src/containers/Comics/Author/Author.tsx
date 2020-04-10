import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import AuthorList from './components/AuthorList'
import AuthorCreation from './components/AuthorCreation'
import AuthorEdit from './components/AuthorEdit'
import AuthorDetail from './components/AuthorDetail'
import AuthorContext from './context/AuthorContext'
import { mockAuthor, mockAuthorList } from './mockData/mockData'

export default function Author() {
  return (
    <AuthorContext.Provider
      value={{ authorList: mockAuthorList, authorTotal: mockAuthorList.length, currentAuthor: mockAuthor }}
    >
      <Switch>
        <Route exact path={routePath.comics.authorCreation} component={AuthorCreation} />
        <Route exact path={routePath.comics.authorEdit} component={AuthorEdit} />
        <Route exact path={routePath.comics.authorDetail} component={AuthorDetail} />
        <Route exact path={routePath.comics.author} component={AuthorList} />
      </Switch>
    </AuthorContext.Provider>
  )
}
