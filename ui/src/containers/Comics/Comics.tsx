import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ComicList from './List/ComicList'
import CategoryList from './Category/CategoryList'
import ContentList from './Contents/ContentList'
import AuthorList from './Authors/AuthorList'
import CommentList from './Comments/CommentList'

export default function Comics() {
  return (
    <>
      <Switch>
        <Route path={routePath.comics.list} component={ComicList} />
        <Route path={routePath.comics.categories} component={CategoryList} />
        <Route path={routePath.comics.contents} component={ContentList} />
        <Route path={routePath.comics.authors} component={AuthorList} />
        <Route path={routePath.comics.comments} component={CommentList} />
      </Switch>
    </>
  )
}
