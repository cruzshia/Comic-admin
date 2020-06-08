import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { switchMap, map, tap, catchError, exhaustMap } from 'rxjs/operators'
import {
  SubscriptionProductActionType,
  getSubscriptionProductListSuccessAction,
  createSubscriptionProductSuccessAction
} from '@src/reducers/comics/subscription/subscriptionProductAction'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import { emptyErrorReturn } from '@src/epics/utils'
import * as subscriptionProductServices from './subscriptionProductServices'

export const getSubscriptionProductListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionProductActionType.GET_PRODUCT_LIST),
    switchMap(action =>
      subscriptionProductServices.getSubscriptionProductListAjax(action.payload).pipe(
        map(res => getSubscriptionProductListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionProductActionType.GET_PRODUCT_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionProductActionType.GET_PRODUCT_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createSubscriptionProductEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionProductActionType.CREATE_PRODUCT),
    exhaustMap(action =>
      subscriptionProductServices.createSubscriptionProductAjax(action.payload).pipe(
        map(res => createSubscriptionProductSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionProductActionType.CREATE_PRODUCT_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionProductActionType.CREATE_PRODUCT_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getSubscriptionProductListEpic, createSubscriptionProductEpic]
