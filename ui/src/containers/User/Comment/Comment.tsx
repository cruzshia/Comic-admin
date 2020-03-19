import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import CommentList from './components/CommentList'
import CommentDetail from './components/CommentDetail'
import CommentEdit from './components/CommentEdit'
import CommentContext from './context/CommentContext'

export default function Comment() {
  return (
    <CommentContext.Provider value={{ commentList: [], commentTotal: 0 }}>
      <Switch>
        <Route exact path={routePath.user.comment} component={CommentList} />
        <Route exact path={routePath.user.commentDetail} component={CommentDetail} />
        <Route exact path={routePath.user.commentEdit} component={CommentEdit} />
      </Switch>
    </CommentContext.Provider>
  )
}
