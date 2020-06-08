import Subscription, { SubscriptionProduct } from '@src/models/comics/subscription'
import { SubscriptionActionType } from './subscriptionAction'
import { ActionType } from '../../types'

export interface SubscriptionState {
  subscriptionList: Subscription[]
  subscriptionTotal: number
  currentSubscription?: Subscription
  subscriptionProductList: SubscriptionProduct[]
  subscriptionProductTotal: number
  currentSubscriptionProduct?: SubscriptionProduct
}

const initState: SubscriptionState = {
  subscriptionList: [],
  subscriptionTotal: 0,
  subscriptionProductList: [],
  subscriptionProductTotal: 0
}

export const SubscriptionPreloadState = initState

const updateCurrentSubscriptionHandler = (state: SubscriptionState, action: ActionType<any>): SubscriptionState => ({
  ...state,
  currentSubscription: action.payload
})

const handler: Record<string, (state: SubscriptionState, action: ActionType<any>) => SubscriptionState> = {
  [SubscriptionActionType.GET_LIST_SUCCESS]: (
    state: SubscriptionState = initState,
    action: ActionType<Subscription[]>
  ): SubscriptionState => {
    return {
      ...state,
      subscriptionList: action.payload,
      subscriptionTotal: action.payload.length
    }
  },
  [SubscriptionActionType.RESET_SUBSCRIPTION]: updateCurrentSubscriptionHandler,
  [SubscriptionActionType.GET_SUBSCRIPTION_SUCCESS]: updateCurrentSubscriptionHandler,
  [SubscriptionActionType.CREATE_SUCCESS]: updateCurrentSubscriptionHandler,
  [SubscriptionActionType.UPDATE_SUCCESS]: updateCurrentSubscriptionHandler
}

export default function subscriptionReducer(state: SubscriptionState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
