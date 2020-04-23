import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { exhaustMap, catchError, tap, map, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  PushNotificationActionType,
  getPushNotificationListSuccessAction
} from '@src/reducers/application/pushNotification/pushNotificationActions'
import * as pushNotificationServices from './pushNotificationServices'

export const getPushNotificationListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(PushNotificationActionType.GET_LIST),
    exhaustMap(() =>
      pushNotificationServices.getPushNotificationListAjax().pipe(
        map(res => getPushNotificationListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: PushNotificationActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: PushNotificationActionType.GET_LIST_ERROR })
          return of().pipe(ignoreElements())
        })
      )
    )
  )

export const deletePushNotificationEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(PushNotificationActionType.DELETE),
    exhaustMap(action =>
      pushNotificationServices.deletePushNotificationAjax(action.payload).pipe(
        tap(() => successSubject.next({ type: PushNotificationActionType.DELETE_SUCCESS })),
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: PushNotificationActionType.DELETE_ERROR })
          return of().pipe(ignoreElements())
        })
      )
    )
  )

export default [getPushNotificationListEpic, deletePushNotificationEpic]
