import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { exhaustMap, switchMap, catchError, tap, map, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  PushNotificationActionType,
  getPushNotificationListSuccessAction,
  getPushNotificationSuccessAction,
  createPushNotificationSuccessAction,
  updatePushNotificationSuccessAction
} from '@src/reducers/application/pushNotification/pushNotificationActions'
import * as pushNotificationServices from './pushNotificationServices'
import { emptyErrorReturn } from '@src/epics/utils'
import { toRequestNotification, toEditableNotification } from './transform'

export const getPushNotificationListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(PushNotificationActionType.GET_LIST),
    switchMap(action =>
      pushNotificationServices.getPushNotificationListAjax(action.payload).pipe(
        map(res => getPushNotificationListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: PushNotificationActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: PushNotificationActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getPushNotificationEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(PushNotificationActionType.GET_NOTIFICATION),
    switchMap(action =>
      pushNotificationServices.getPushNotificationAjax(action.payload).pipe(
        map(res => getPushNotificationSuccessAction(toEditableNotification(res.response))),
        tap(() => successSubject.next({ type: PushNotificationActionType.GET_NOTIFICATION_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: PushNotificationActionType.GET_NOTIFICATION_ERROR })
          return emptyErrorReturn()
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
          return emptyErrorReturn()
        })
      )
    )
  )

export const createPushNotificationEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(PushNotificationActionType.CREATE),
    exhaustMap(action =>
      pushNotificationServices.createPushNotificationAjax(toRequestNotification(action.payload)).pipe(
        map(res => createPushNotificationSuccessAction(res.response)),
        tap(() => successSubject.next({ type: PushNotificationActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: PushNotificationActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updatePushNotificationEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(PushNotificationActionType.UPDATE),
    exhaustMap(action =>
      pushNotificationServices.updatePushNotificationAjax(toRequestNotification(action.payload)).pipe(
        map(res => updatePushNotificationSuccessAction(res.response)),
        tap(() => successSubject.next({ type: PushNotificationActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: PushNotificationActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [
  getPushNotificationListEpic,
  deletePushNotificationEpic,
  createPushNotificationEpic,
  getPushNotificationEpic,
  updatePushNotificationEpic
]
