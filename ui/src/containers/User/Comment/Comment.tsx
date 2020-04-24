import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { routePath } from '@src/common/appConfig'
import {
  getCommentListAction,
  getCommentAction,
  updateCommentAction,
  deleteCommentAction
} from '@src/reducers/user/comment/commentAction'
import UserComment from '@src/models/user/comment'
import CommentContext, { ActionContext } from './context/CommentContext'
import CommentList from './components/CommentList'
import CommentDetail from './components/CommentDetail'
import CommentEdit from './components/CommentEdit'

export default function Comment() {
  const dispatch = useDispatch()
  const { commentList, currentComment } = useSelector((state: StoreState) => state.comment)

  const handleGetCommentList = useCallback(() => dispatch(getCommentListAction()), [dispatch])
  const handleGetComment = useCallback((commentId: string) => dispatch(getCommentAction(commentId)), [dispatch])
  const handleUpdateComment = useCallback((data: UserComment) => dispatch(updateCommentAction(data)), [dispatch])
  const handleDeleteComment = useCallback((idList: string[]) => dispatch(deleteCommentAction(idList)), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetCommentList: handleGetCommentList,
        onGetComment: handleGetComment,
        onUpdateComment: handleUpdateComment,
        onDeleteComment: handleDeleteComment
      }}
    >
      <CommentContext.Provider
        value={{ commentList: commentList, currentComment: currentComment, commentTotal: commentList.length }}
      >
        <Switch>
          <Route exact path={routePath.user.comment} component={CommentList} />
          <Route exact path={routePath.user.commentDetail} component={CommentDetail} />
          <Route exact path={routePath.user.commentEdit} component={CommentEdit} />
        </Switch>
      </CommentContext.Provider>
    </ActionContext.Provider>
  )
}
