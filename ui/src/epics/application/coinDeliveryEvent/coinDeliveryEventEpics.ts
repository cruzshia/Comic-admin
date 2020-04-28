import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  CoinDeliveryEventActionType,
  getCoinDeliveryEventListSuccessAction,
  getCoinDeliveryEventSuccessAction,
  createCoinDeliveryEventSuccessAction,
  updateCoinDeliveryEventSuccessAction
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

export const getCoinDeliveryEventEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinDeliveryEventActionType.GET),
    switchMap(action =>
      coinDeliveryEventServices.getCoinDeliveryEventAjax(action.payload).pipe(
        map(res => getCoinDeliveryEventSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinDeliveryEventActionType.GET_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinDeliveryEventActionType.GET_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createCoinDeliveryEventEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinDeliveryEventActionType.CREATE),
    exhaustMap(action =>
      coinDeliveryEventServices.createCoinDeliveryEventAjax(action.payload).pipe(
        map(res => createCoinDeliveryEventSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinDeliveryEventActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinDeliveryEventActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateCoinDeliveryEventEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinDeliveryEventActionType.UPDATE),
    exhaustMap(action =>
      coinDeliveryEventServices.updateCoinDeliveryEventAjax(action.payload).pipe(
        map(res => updateCoinDeliveryEventSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinDeliveryEventActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinDeliveryEventActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [
  getCoinDeliveryEventListEpic,
  getCoinDeliveryEventEpic,
  createCoinDeliveryEventEpic,
  updateCoinDeliveryEventEpic
]
