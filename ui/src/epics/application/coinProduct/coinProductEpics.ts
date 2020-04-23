import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, exhaustMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  CoinProductActionType,
  getCoinProductListSuccessAction
} from '@src/reducers/application/coinProduct/coinProductActions'
import * as coinProductServices from './coinProductServices'

export const getCoinProductListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinProductActionType.GET_LIST),
    exhaustMap(() =>
      coinProductServices.getCoinProductListAjax().pipe(
        map(res => getCoinProductListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinProductActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinProductActionType.GET_LIST_ERROR })
          return ignoreElements()
        })
      )
    )
  )

export default [getCoinProductListEpic]
