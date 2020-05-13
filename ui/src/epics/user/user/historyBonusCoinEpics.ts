import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  HistoryBonusCoinActionType,
  getHistoryBonusCoinListSuccessAction,
  getHistoryBonusCoinSuccessAction
} from '@src/reducers/user/user/historyBonusCoinActions'
import * as historyBonusCoinServices from './historyBonusCoinServices'
import { emptyErrorReturn } from '../../utils'

export const getHistoryBonusCoinListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryBonusCoinActionType.GET_LIST),
    switchMap(() =>
      historyBonusCoinServices.getHistoryBonusCoinListAjax().pipe(
        map(res => getHistoryBonusCoinListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryBonusCoinActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryBonusCoinActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getHistoryBonusCoinEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryBonusCoinActionType.GET_HISTORY_BONUS_COIN),
    switchMap(action =>
      historyBonusCoinServices.getHistoryBonusCoinAjax(action.payload).pipe(
        map(res => getHistoryBonusCoinSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryBonusCoinActionType.GET_HISTORY_BONUS_COIN_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryBonusCoinActionType.GET_HISTORY_BONUS_COIN_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getHistoryBonusCoinListEpic, getHistoryBonusCoinEpic]
