import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, exhaustMap, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  UserActionType,
  getUserListSuccessAction,
  createUserSuccessAction,
  getUserSuccessAction,
  getUserExportLogListSuccessAction
} from '@src/reducers/user/user/userActions'
import * as userServices from './userServices'
import { emptyErrorReturn } from '../../utils'

export const getUserListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.GET_LIST),
    switchMap(() =>
      userServices.getUserListAjax().pipe(
        map(res => getUserListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: UserActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: UserActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getUserEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.GET_USER),
    switchMap(action =>
      userServices.getUserAjax(action.payload).pipe(
        map(res => getUserSuccessAction(res.response)),
        tap(() => successSubject.next({ type: UserActionType.GET_USER_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: UserActionType.GET_USER_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getUserExportLogListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.GET_EXPORT_LOG_LIST),
    switchMap(() =>
      userServices.getUserExportLogListAjax().pipe(
        map(res => getUserExportLogListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: UserActionType.GET_EXPORT_LOG_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: UserActionType.GET_EXPORT_LOG_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createUserEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionType.CREATE),
    exhaustMap(action =>
      userServices.createUserAjax(action.payload).pipe(
        map(res => createUserSuccessAction(res.response)),
        tap(() => successSubject.next({ type: UserActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: UserActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )
export default [getUserListEpic, getUserEpic, getUserExportLogListEpic, createUserEpic]
