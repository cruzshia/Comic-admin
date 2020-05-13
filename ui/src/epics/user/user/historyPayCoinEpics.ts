import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  HistoryPayCoinActionType,
  getHistoryPayCoinListSuccessAction,
  getHistoryPayCoinSuccessAction
} from '@src/reducers/user/user/historyPayCoinActions'
import * as historyPayCoinServices from './historyPayCoinServices'
import { emptyErrorReturn } from '../../utils'

export const getHistoryPayCoinListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryPayCoinActionType.GET_LIST),
    switchMap(() =>
      historyPayCoinServices.getHistoryPayCoinListAjax().pipe(
        map(res => getHistoryPayCoinListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryPayCoinActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryPayCoinActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getHistoryPayCoinEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryPayCoinActionType.GET_HISTORY_PAY_COIN),
    switchMap(action =>
      historyPayCoinServices.getHistoryPayCoinAjax(action.payload).pipe(
        map(res => getHistoryPayCoinSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryPayCoinActionType.GET_HISTORY_PAY_COIN_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryPayCoinActionType.GET_HISTORY_PAY_COIN_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getHistoryPayCoinListEpic, getHistoryPayCoinEpic]
