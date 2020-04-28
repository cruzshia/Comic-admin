import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  ApplicationInfoActionType,
  getApplicationInfoListSuccessAction,
  getApplicationInfoSuccessAction,
  createApplicationInfoSuccessAction,
  updateApplicationInfoSuccessAction
} from '@src/reducers/application/applicationInfo/applicationInfoActions'
import * as applicationInfoServices from './applicationInfoServices'
import { emptyErrorReturn } from '@src/epics/utils'

export const getApplicationInfoListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ApplicationInfoActionType.GET_LIST),
    switchMap(() =>
      applicationInfoServices.getApplicationInfoListAjax().pipe(
        map(res => getApplicationInfoListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ApplicationInfoActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ApplicationInfoActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getApplicationInfoEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ApplicationInfoActionType.GET),
    switchMap(action =>
      applicationInfoServices.getApplicationInfoAjax(action.payload).pipe(
        map(res => getApplicationInfoSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ApplicationInfoActionType.GET_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ApplicationInfoActionType.GET_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createApplicationInfoEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ApplicationInfoActionType.CREATE),
    exhaustMap(action =>
      applicationInfoServices.createApplicationInfoAjax(action.payload).pipe(
        map(res => createApplicationInfoSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ApplicationInfoActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ApplicationInfoActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateApplicationInfoEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(ApplicationInfoActionType.UPDATE),
    exhaustMap(action =>
      applicationInfoServices.updateApplicationInfoAjax(action.payload).pipe(
        map(res => updateApplicationInfoSuccessAction(res.response)),
        tap(() => successSubject.next({ type: ApplicationInfoActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: ApplicationInfoActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [
  getApplicationInfoListEpic,
  getApplicationInfoEpic,
  createApplicationInfoEpic,
  updateApplicationInfoEpic
]
