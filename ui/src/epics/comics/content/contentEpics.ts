import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, exhaustMap, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  ContentActionType,
  getContentListSuccessAction,
  getContentSuccessAction,
  createContentSuccessAction,
  updateContentSuccessAction
} from '@src/reducers/comics/content/contentActions'
import * as contentServices from './contentServices'
import { emptyErrorReturn } from '../../utils'

export const getContentListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentActionType.GET_LIST),
    switchMap(() =>
      contentServices.getContentListAjax().pipe(
        map(res => getContentListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getContentEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentActionType.GET_CONTENT),
    switchMap(action =>
      contentServices.getContentAjax(action.payload).pipe(
        map(res => getContentSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentActionType.GET_CONTENT_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentActionType.GET_CONTENT_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createContentEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentActionType.CREATE),
    exhaustMap(action =>
      contentServices.createContentAjax(action.payload).pipe(
        map(res => createContentSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateContentEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ContentActionType.UPDATE),
    exhaustMap(action =>
      contentServices.updateContentAjax(action.payload).pipe(
        map(res => updateContentSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ContentActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ContentActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getContentListEpic, getContentEpic, createContentEpic, updateContentEpic]
