import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { successSubject, errorSubject } from '@src/utils/responseSubject'
import {
  SubscriptionActionType,
  getSubscriptionListSuccessAction,
  getSubscriptionSuccessAction
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

export default [getSubscriptionListEpic, getSubscriptionEpic]
