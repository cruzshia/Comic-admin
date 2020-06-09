import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { switchMap, map, tap, catchError, exhaustMap, ignoreElements } from 'rxjs/operators'
import {
  SubscriptionProductActionType,
  getSubscriptionProductListSuccessAction,
  createSubscriptionProductSuccessAction,
  getSubscriptionProductSuccessAction
} from '@src/reducers/comics/subscription/subscriptionProductAction'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { emptyErrorReturn } from '@src/epics/utils'
import * as subscriptionProductServices from './subscriptionProductServices'

export const getSubscriptionProductListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionProductActionType.GET_LIST),
    switchMap(action =>
      subscriptionProductServices.getSubscriptionProductListAjax(action.payload).pipe(
        map(res => getSubscriptionProductListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionProductActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionProductActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createSubscriptionProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionProductActionType.CREATE),
    exhaustMap(action =>
      subscriptionProductServices.createSubscriptionProductAjax(action.payload).pipe(
        map(res => createSubscriptionProductSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionProductActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionProductActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getSubscriptionProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionProductActionType.GET_PRODUCT),
    switchMap(action =>
      subscriptionProductServices.getSubscriptionProductAjax(action.payload).pipe(
        map(res => getSubscriptionProductSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionProductActionType.GET_PRODUCT_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionProductActionType.GET_PRODUCT_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const deleteSubscriptionProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionProductActionType.DELETE),
    exhaustMap(action =>
      subscriptionProductServices.deleteSubscriptionProductAjax(action.payload).pipe(
        tap(() => successSubject.next({ type: SubscriptionProductActionType.DELETE_SUCCESS })),
        ignoreElements(),
        catchError(() => {
          errorSubject.next({ type: SubscriptionProductActionType.DELETE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateSubscriptionProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionProductActionType.UPDATE),
    exhaustMap(action =>
      subscriptionProductServices.updateSubscriptionProductAjax(action.payload).pipe(
        map(res => getSubscriptionProductSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionProductActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionProductActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [
  getSubscriptionProductListEpic,
  createSubscriptionProductEpic,
  getSubscriptionProductEpic,
  deleteSubscriptionProductEpic,
  updateSubscriptionProductEpic
]
