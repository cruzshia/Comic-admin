import { Observable } from 'rxjs'
import { ofType } from 'redux-observable'
import {
  getCommentListSuccessAction,
  CommentActionType,
  getCommentSuccessAction,
  updateCommentSuccessAction
} from '@src/reducers/user/comment/commentAction'
import { AnyAction } from 'redux'
import { exhaustMap, map, tap, catchError, ignoreElements } from 'rxjs/operators'
import * as commentServices from './commentServices'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { emptyErrorReturn } from '../../utils'

const getCommentListEpics = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(CommentActionType.GET_LIST),
    exhaustMap(() =>
      commentServices.getCommentListAjax().pipe(
        map(res => getCommentListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CommentActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CommentActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

const getCommentEpics = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(CommentActionType.GET_COMMENT),
    exhaustMap(action =>
      commentServices.getCommentAjax(action.payload).pipe(
        map(res => getCommentSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CommentActionType.GET_COMMENT_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CommentActionType.GET_COMMENT_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

const updateCommentEpics = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(CommentActionType.UPDATE),
    exhaustMap(action =>
      commentServices.updateCommentAjax(action.payload).pipe(
        map(res => updateCommentSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CommentActionType.UPDATE_SUCCESS })),
        catchError(err => {
          errorSubject.next({ type: CommentActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )
const deleteCommentEpics = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(CommentActionType.DELETE),
    exhaustMap(action =>
      commentServices.deleteCommentAjax(action.payload).pipe(
        tap(() => successSubject.next({ type: CommentActionType.DELETE_SUCCESS })),
        ignoreElements(),
        catchError(err => {
          errorSubject.next({ type: CommentActionType.DELETE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getCommentListEpics, getCommentEpics, updateCommentEpics, deleteCommentEpics]
