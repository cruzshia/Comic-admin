import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, exhaustMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  WorkActionType,
  getWorkListSuccessAction,
  getWorkSuccessAction,
  createWorkSuccessAction,
  updateWorkSuccessAction,
  getCsvLogListSuccessAction
} from '@src/reducers/comics/work/workActions'
import * as workServices from './workServices'
import { emptyErrorReturn } from '../../utils'

export const getWorkListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_LIST),
    switchMap(() =>
      workServices.getWorkListAjax().pipe(
        map(res => getWorkListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorkActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_WORK),
    switchMap(action =>
      workServices.getWorkAjax(action.payload).pipe(
        map(res => getWorkSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorkActionType.GET_WORK_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.GET_WORK_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )
export const createWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.CREATE),
    exhaustMap(action =>
      workServices.createWorkAjax(action.payload).pipe(
        map(res => createWorkSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorkActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateWorkEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.UPDATE),
    exhaustMap(action =>
      workServices.updateWorkAjax(action.payload).pipe(
        map(res => updateWorkSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorkActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getCsvLogListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.GET_CSV_LOG_LIST),
    exhaustMap(() =>
      workServices.getCsvLogListAjax().pipe(
        map(res => getCsvLogListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: WorkActionType.GET_CSV_LOG_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.GET_CSV_LOG_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const importWorksEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(WorkActionType.IMPORT_WORKS),
    exhaustMap(() =>
      workServices.importWorksAjax().pipe(
        tap(() => successSubject.next({ type: WorkActionType.IMPORT_WORKS_SUCCESS })),
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: WorkActionType.IMPORT_WORKS_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getWorkListEpic, getWorkEpic, createWorkEpic, updateWorkEpic, getCsvLogListEpic, importWorksEpic]
