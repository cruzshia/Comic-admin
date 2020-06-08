import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap, exhaustMap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  SubscriptionActionType,
  getSubscriptionListSuccessAction,
  getSubscriptionSuccessAction,
  createSubscriptionSuccessAction,
  updateSubscriptionSuccessAction
} from '@src/reducers/comics/subscription/subscriptionAction'
import * as subscriptionServices from './subscriptionServices'
import { emptyErrorReturn } from '../../utils'

export const getSubscriptionListEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionActionType.GET_LIST),
    switchMap(() =>
      subscriptionServices.getSubscriptionListAjax().pipe(
        map(res => getSubscriptionListSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionActionType.GET_LIST_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionActionType.GET_LIST_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const getSubscriptionEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionActionType.GET_SUBSCRIPTION),
    switchMap(action =>
      subscriptionServices.getSubscriptionAjax(action.payload).pipe(
        map(res => getSubscriptionSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionActionType.GET_SUBSCRIPTION_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionActionType.GET_SUBSCRIPTION_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const createSubscriptionEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionActionType.CREATE),
    exhaustMap(action =>
      subscriptionServices.createSubscriptionAjax(action.payload).pipe(
        map(res => createSubscriptionSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionActionType.CREATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionActionType.CREATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export const updateSubscriptionEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(SubscriptionActionType.UPDATE),
    exhaustMap(action =>
      subscriptionServices.updateSubscriptionAjax(action.payload).pipe(
        map(res => updateSubscriptionSuccessAction(res.response)),
        tap(() => successSubject.next({ type: SubscriptionActionType.UPDATE_SUCCESS })),
        catchError(() => {
          errorSubject.next({ type: SubscriptionActionType.UPDATE_ERROR })
          return emptyErrorReturn()
        })
      )
    )
  )

export default [getSubscriptionListEpic, getSubscriptionEpic, createSubscriptionEpic, updateSubscriptionEpic]
