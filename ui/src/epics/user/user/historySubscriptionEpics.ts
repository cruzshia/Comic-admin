import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap, exhaustMap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  HistorySubscriptionActionType,
  getHistorySubscriptionListSuccessAction,
  getHistorySubscriptionSuccessAction
} from '@src/reducers/user/user/historySubscriptionActions'
import * as historySubscriptionServices from './historySubscriptionServices'
import { emptyErrorReturn } from '../../utils'

export const getHistorySubscriptionListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistorySubscriptionActionType.GET_LIST),
    switchMap(() =>
      historySubscriptionServices.getHistorySubscriptionListAjax().pipe(
        map(res => getHistorySubscriptionListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistorySubscriptionActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistorySubscriptionActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getHistorySubscriptionEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistorySubscriptionActionType.GET_HISTORY_SUBSCRIPTION),
    switchMap(action =>
      historySubscriptionServices.getHistorySubscriptionAjax(action.payload).pipe(
        map(res => getHistorySubscriptionSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistorySubscriptionActionType.GET_HISTORY_SUBSCRIPTION_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistorySubscriptionActionType.GET_HISTORY_SUBSCRIPTION_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const deleteHistorySubscriptionEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistorySubscriptionActionType.DELETE_HISTORY_SUBSCRIPTION),
    exhaustMap(action =>
      historySubscriptionServices.deleteHistorySubscriptionAjax(action.payload).pipe(
        tap(() => successSubject.next({ type: HistorySubscriptionActionType.DELETE_HISTORY_SUBSCRIPTION_SUCCESS })),
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: HistorySubscriptionActionType.DELETE_HISTORY_SUBSCRIPTION_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getHistorySubscriptionListEpic, getHistorySubscriptionEpic, deleteHistorySubscriptionEpic]
