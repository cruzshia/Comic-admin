import { Observable } from 'rxjs'
import { ofType } from 'redux-observable'
import { getCommentListSuccessAction, CommentActionType } from '@src/reducers/user/comment/commentAction'
import { AnyAction } from 'redux'
import { exhaustMap, map, tap, catchError, ignoreElements } from 'rxjs/operators'
import * as commentServices from './commentServices'
import { emptyErrorReturn } from '../../utils'
import { successSubject, errorSubject } from '@src/utils/responseSubject'

const getCommentListEpics = (action$: Observable<AnyAction>) =>
  action$.pipe(
    ofType(CommentActionType.GET_LIST),
    exhaustMap(() =>
      commentServices.getCommentListAjax().pipe(
        map(res => getCommentListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CommentActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CommentActionType.GET_LIST_ERROR })
          return emptyErrorReturn.pipe(ignoreElements())
        })
      )
    )
  )

export default [getCommentListEpics]
