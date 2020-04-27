import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  CoinDeliveryEventActionType,
  getCoinDeliveryEventListSuccessAction
} from '@src/reducers/application/coinDeliveryEvent/coinDeliveryEventActions'
import * as coinDeliveryEventServices from './coinDeliveryEventServices'
import { emptyErrorReturn } from '@src/epics/utils'

export const getCoinDeliveryEventListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinDeliveryEventActionType.GET_LIST),
    switchMap(() =>
      coinDeliveryEventServices.getCoinDeliveryEventListAjax().pipe(
        map(res => getCoinDeliveryEventListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinDeliveryEventActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinDeliveryEventActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getCoinDeliveryEventListEpic]
