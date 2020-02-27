import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ComicList from './List/ComicList'
import CategoryList from './Category/CategoryList'
import ContentList from './Content/ContentList'
import AuthorList from './Author/AuthorList'
import CommentList from './Comment/CommentList'

export default function Comics() {
  return (
    <Switch>
      <Route exact path={routePath.comics.list} component={ComicList} />
      <Route exact path={routePath.comics.category} component={CategoryList} />
      <Route exact path={routePath.comics.content} component={ContentList} />
      <Route exact path={routePath.comics.author} component={AuthorList} />
      <Route exact path={routePath.comics.comment} component={CommentList} />
    </Switch>
  )
}
