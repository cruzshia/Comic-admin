import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, switchMap, catchError, tap, exhaustMap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  AuthorActionType,
  getAuthorListSuccessAction,
  getAuthorSuccessAction,
  createAuthorSuccessAction,
  updateAuthorSuccessAction
} from '@src/reducers/comics/author/authorActions'
import * as authorServices from './authorServices'
import { toDisplayableDetail } from './transform'
import { emptyErrorReturn, toMockData } from '../../utils'
import { mockAuthorList, mockAuthor } from './mockData/mockData'

export const getAuthorListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(AuthorActionType.GET_LIST),
    switchMap(action =>
      authorServices.getAuthorListAjax(action.payload).pipe(
        map(res => getAuthorListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: AuthorActionType.GET_LIST_SUCCESS })),
        catchError(error => {
          errorSubject.next({ type: AuthorActionType.GET_LIST_ERROR })
          return (
            toMockData(
              error,
              of(getAuthorListSuccessAction({ authors: mockAuthorList, total_count: mockAuthorList.length }))
            ) || emptyErrorReturn()
          )
        })
      )
    )
  )

export const getAuthorEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(AuthorActionType.GET_AUTHOR),
    switchMap(action =>
      authorServices.getAuthorAjax(action.payload).pipe(
        map(res => getAuthorSuccessAction(toDisplayableDetail(res.response))),
        tap(() => successSubject.next({ type: AuthorActionType.GET_AUTHOR_SUCCESS })),
        catchError(error => {
          errorSubject.next({ type: AuthorActionType.GET_AUTHOR_ERROR })
          return (
            toMockData(error, of(getAuthorSuccessAction(toDisplayableDetail(mockAuthor(action.payload))))) ||
            emptyErrorReturn()
          )
        })
      )
    )
  )

export const createAuthorEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(AuthorActionType.CREATE),
    exhaustMap(action =>
      authorServices.createAuthorAjax(action.payload).pipe(
        map(res => createAuthorSuccessAction(toDisplayableDetail(res.response))),
        tap(() => successSubject.next({ type: AuthorActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: AuthorActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateAuthorEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(AuthorActionType.UPDATE),
    exhaustMap(action =>
      authorServices.updateAuthorAjax(action.payload).pipe(
        map(res => updateAuthorSuccessAction(toDisplayableDetail(res.response))),
        tap(() => successSubject.next({ type: AuthorActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: AuthorActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getAuthorListEpic, getAuthorEpic, createAuthorEpic, updateAuthorEpic]
