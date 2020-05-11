import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  HistoryEpisodeActionType,
  getHistoryEpisodeListSuccessAction,
  getHistoryEpisodeSuccessAction
} from '@src/reducers/user/user/historyEpisodeActions'
import * as historyEpisodeServices from './historyEpisodeServices'
import { emptyErrorReturn } from '../../utils'

export const getHistoryEpisodeListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryEpisodeActionType.GET_LIST),
    switchMap(() =>
      historyEpisodeServices.getHistoryEpisodeListAjax().pipe(
        map(res => getHistoryEpisodeListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryEpisodeActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryEpisodeActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getHistoryEpisodeEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(HistoryEpisodeActionType.GET_HISTORY_EPISODE),
    switchMap(action =>
      historyEpisodeServices.getHistoryEpisodeAjax(action.payload).pipe(
        map(res => getHistoryEpisodeSuccessAction(res.response)),
        tap(() => successSubject.next({ type: HistoryEpisodeActionType.GET_HISTORY_EPISODE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: HistoryEpisodeActionType.GET_HISTORY_EPISODE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getHistoryEpisodeListEpic, getHistoryEpisodeEpic]
