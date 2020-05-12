import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  HistoryMagazineActionType,
  getHistoryMagazineListSuccessAction,
  getHistoryMagazineSuccessAction
} from '@src/reducers/user/user/historyMagazineActions'
import * as historyMagazineServices from './historyMagazineServices'
import { emptyErrorReturn } from '../../utils'

export const getHistoryMagazineListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryMagazineActionType.GET_LIST),
    switchMap(() =>
      historyMagazineServices.getHistoryMagazineListAjax().pipe(
        map(res => getHistoryMagazineListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryMagazineActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryMagazineActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getHistoryMagazineEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryMagazineActionType.GET_HISTORY_MAGAZINE),
    switchMap(action =>
      historyMagazineServices.getHistoryMagazineAjax(action.payload).pipe(
        map(res => getHistoryMagazineSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryMagazineActionType.GET_HISTORY_MAGAZINE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryMagazineActionType.GET_HISTORY_MAGAZINE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getHistoryMagazineListEpic, getHistoryMagazineEpic]
