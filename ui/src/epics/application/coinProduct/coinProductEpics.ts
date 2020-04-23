import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, ignoreElements } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  CoinProductActionType,
  getCoinProductListSuccessAction,
  createCoinProductSuccessAction,
  getCoinProductSuccessAction,
  updateCoinProductSuccessAction
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
          return of().pipe(ignoreElements())
        })
      )
    )
  )

export const getCoinProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinProductActionType.GET),
    exhaustMap(action =>
      coinProductServices.getCoinProductAjax(action.payload).pipe(
        map(res => getCoinProductSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinProductActionType.GET_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinProductActionType.GET_ERROR })
          return of().pipe(ignoreElements())
        })
      )
    )
  )

export const createCoinProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinProductActionType.CREATE),
    exhaustMap(action =>
      coinProductServices.createCoinProductAjax(action.payload).pipe(
        map(res => createCoinProductSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinProductActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinProductActionType.CREATE_ERROR })
          return of().pipe(ignoreElements())
        })
      )
    )
  )

export const updateCoinProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(CoinProductActionType.UPDATE),
    exhaustMap(action =>
      coinProductServices.updateCoinProductAjax(action.payload).pipe(
        map(res => updateCoinProductSuccessAction(res.response)),
        tap(() => successSubject.next({ type: CoinProductActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: CoinProductActionType.UPDATE_ERROR })
          return of().pipe(ignoreElements())
        })
      )
    )
  )

export default [getCoinProductListEpic, getCoinProductEpic, createCoinProductEpic, updateCoinProductEpic]
