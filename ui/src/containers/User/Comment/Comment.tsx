import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import CommentList from './components/CommentList'
import CommentDetail from './components/CommentDetail'
import CommentEdit from './components/CommentEdit'
import CommentContext from './context/CommentContext'
import { mockCommentList } from './mockData/mock'

export default function Comment() {
  return (
    <CommentContext.Provider value={{ commentList: mockCommentList, commentTotal: mockCommentList.length }}>
      <Switch>
        <Route exact path={routePath.user.comment} component={CommentList} />
        <Route exact path={routePath.user.commentDetail} component={CommentDetail} />
        <Route exact path={routePath.user.commentEdit} component={CommentEdit} />
      </Switch>
    </CommentContext.Provider>
  )
}
