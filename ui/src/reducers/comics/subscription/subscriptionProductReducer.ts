import { SubscriptionProduct } from '@src/models/comics/subscription'
import { SubscriptionProductActionType, ProductListParams } from './subscriptionProductAction'
import { ActionType } from '../../types'

export interface SubscriptionProductState {
  subscriptionProductList: SubscriptionProduct[]
  subscriptionProductTotal: number
  currentSubscriptionProduct?: SubscriptionProduct
}

const initState: SubscriptionProductState = {
  subscriptionProductList: [],
  subscriptionProductTotal: 0
}

export const SubscriptionProductPreloadState = initState

const updateCurrentSubscriptionProductHandler = (
  state: SubscriptionProductState,
  action: ActionType<any>
): SubscriptionProductState => ({
  ...state,
  currentSubscriptionProduct: action.payload
})

const handler: Record<
  string,
  (state: SubscriptionProductState, action: ActionType<any>) => SubscriptionProductState
> = {
  [SubscriptionProductActionType.GET_LIST_SUCCESS]: (
    state: SubscriptionProductState = initState,
    action: ActionType<ProductListParams>
  ): SubscriptionProductState => {
    return {
      ...state,
      subscriptionProductList: action.payload.products,
      subscriptionProductTotal: action.payload.total
    }
  },
  [SubscriptionProductActionType.CREATE_SUCCESS]: updateCurrentSubscriptionProductHandler,
  [SubscriptionProductActionType.GET_PRODUCT_SUCCESS]: updateCurrentSubscriptionProductHandler,
  [SubscriptionProductActionType.RESET_PRODUCT]: updateCurrentSubscriptionProductHandler,
  [SubscriptionProductActionType.UPDATE_SUCCESS]: updateCurrentSubscriptionProductHandler
}

export default function subscriptionProductReducer(
  state: SubscriptionProductState = initState,
  action: ActionType<any>
) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
