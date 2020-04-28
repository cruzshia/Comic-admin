import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import AuthorList from './components/AuthorList'
import AuthorCreation from './components/AuthorCreation'
import AuthorEdit from './components/AuthorEdit'
import AuthorDetail from './components/AuthorDetail'
import AuthorContext, { ActionContext } from './context/AuthorContext'
import { StoreState } from '@src/reducers'
import AuthorModel from '@src/models/comics/author'
import {
  getAuthorListAction,
  getAuthorAction,
  resetAuthorAction,
  createAuthorAction,
  updateAuthorAction
} from '@src/reducers/comics/author/authorActions'

export default function Author() {
  const dispatch = useDispatch()
  const { authorList, authorTotal, currentAuthor } = useSelector((state: StoreState) => state.author)

  const handleGetAuthorList = useCallback(() => dispatch(getAuthorListAction()), [dispatch])
  const handleResetAuthor = useCallback(() => dispatch(resetAuthorAction()), [dispatch])
  const handleGetAuthor = useCallback((authorId: string) => dispatch(getAuthorAction(authorId)), [dispatch])
  const handleCreateAuthor = useCallback((author: AuthorModel) => dispatch(createAuthorAction(author)), [dispatch])
  const handleUpdateAuthor = useCallback((author: AuthorModel) => dispatch(updateAuthorAction(author)), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetAuthorList: handleGetAuthorList,
        onGetAuthor: handleGetAuthor,
        onResetAuthor: handleResetAuthor,
        onCreateAuthor: handleCreateAuthor,
        onUpdateAuthor: handleUpdateAuthor
      }}
    >
      <AuthorContext.Provider value={{ authorList, authorTotal, currentAuthor }}>
        <Switch>
          <Route exact path={routePath.comics.authorCreation} component={AuthorCreation} />
          <Route exact path={routePath.comics.authorEdit} component={AuthorEdit} />
          <Route exact path={routePath.comics.authorDetail} component={AuthorDetail} />
          <Route exact path={routePath.comics.author} component={AuthorList} />
        </Switch>
      </AuthorContext.Provider>
    </ActionContext.Provider>
  )
}
