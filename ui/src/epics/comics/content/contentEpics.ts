import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  ContentActionType,
  getContentListSuccessAction,
  getContentSuccessAction
} from '@src/reducers/comics/content/contentActions'
import * as contentServices from './contentServices'

export const getContentListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentActionType.GET_LIST),
    exhaustMap(() =>
      contentServices.getContentListAjax().pipe(
        map(res => getContentListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentActionType.GET_LIST_ERROR })
          return ignoreElements()
        })
      )
    )
  )

export const getContentEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentActionType.GET_CONTENT),
    exhaustMap(action =>
      contentServices.getContentAjax(action.payload).pipe(
        map(res => getContentSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentActionType.GET_CONTENT_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentActionType.GET_CONTENT_ERROR })
          return of().pipe(ignoreElements())
        })
      )
    )
  )

export default [getContentListEpic, getContentEpic]
