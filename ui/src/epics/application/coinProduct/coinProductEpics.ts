import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  CoinProductActionType,
  getCoinProductListSuccessAction
} from '@src/reducers/application/coinProduct/coinProductActions'
import * as coinProductServices from './coinProductServices'
import { emptyErrorReturn } from '@src/epics/utils'

export const getCoinProductListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinProductActionType.GET_LIST),
    exhaustMap(() =>
      coinProductServices.getCoinProductListAjax().pipe(
        map(res => getCoinProductListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinProductActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinProductActionType.GET_LIST_ERROR })
          return emptyErrorReturn
        })
      )
    )
  )

export default [getCoinProductListEpic]
