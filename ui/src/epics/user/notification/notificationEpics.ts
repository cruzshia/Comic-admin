import { ActionsObservable, ofType } from 'redux-observable'
import { switchMap, map, catchError, tap, exhaustMap } from 'rxjs/operators'
import { AnyAction } from 'redux'
import {
  NotificationActionType,
  getNotificationListSuccessAction,
  getNotificationSuccessAction,
  createNotificationSuccessAction
} from '@src/reducers/user/notifiaction/notificationAction'
import * as notificationServices from './notificationServices'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { emptyErrorReturn } from '../../utils'

export const getNotificationListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(NotificationActionType.GET_LIST),
    switchMap(() =>
      notificationServices.getListAjax().pipe(
        map(res => getNotificationListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: NotificationActionType.GET_LIST_SUCCESS })),
        catchError(err => {
          errorSubject.next({ type: NotificationActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getNotificationEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(NotificationActionType.GET_NOTIFY),
    switchMap(action =>
      notificationServices.getNotificationAjax(action.payload).pipe(
        map(res => getNotificationSuccessAction(res.response)),
        tap(() => successSubject.next({ type: NotificationActionType.GET_NOTIFY_SUCCESS })),
        catchError(err => {
          errorSubject.next({ type: NotificationActionType.GET_NOTIFY_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createNotificationEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(NotificationActionType.CREATE),
    exhaustMap(action =>
      notificationServices.createAjax(action.payload).pipe(
        map(res => createNotificationSuccessAction(res.response)),
        tap(() => successSubject.next({ type: NotificationActionType.CREATE_SUCCUSS })),
        catchError(err => {
          errorSubject.next({ type: NotificationActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getNotificationListEpic, getNotificationEpic, createNotificationEpic]
