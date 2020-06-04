import Subscription, { SubscriptionProduct } from '@src/models/comics/subscription'

export enum SubscriptionActionType {
  GET_LIST = '@ComicsSubscription/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsSubscription/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsSubscription/GET_LIST_ERROR',

  GET_SUBSCRIPTION = '@ComicsSubscription/GET_SUBSCRIPTION',
  GET_SUBSCRIPTION_SUCCESS = '@ComicsSubscription/GET_SUBSCRIPTION_SUCCESS',
  GET_SUBSCRIPTION_ERROR = '@ComicsSubscription/GET_SUBSCRIPTION_ERROR',
  RESET_SUBSCRIPTION = '@ComicsSubscription/RESET_SUBSCRIPTION',

  CREATE = '@ComicsSubscription/CREATE',
  CREATE_SUCCESS = '@ComicsSubscription/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsSubscription/CREATE_ERROR',

  UPDATE = '@ComicsSubscription/UPDATE',
  UPDATE_SUCCESS = '@ComicsSubscription/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsSubscription/UPDATE_ERROR',

  GET_PRODUCT_LIST = '@ComicsSubscription/GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_SUCCESS = '@ComicsSubscription/GET_PRODUCT_LIST_SUCCESS',
  GET_PRODUCT_LIST_ERROR = '@ComicsSubscription/GET_PRODUCT_LIST_ERROR'
}

export const getSubscriptionListAction = () => ({
  type: SubscriptionActionType.GET_LIST
})

export const getSubscriptionListSuccessAction = (payload: Subscription[]) => ({
  type: SubscriptionActionType.GET_LIST_SUCCESS,
  payload
})

export const getSubscriptionAction = (subscriptionId: string) => ({
  type: SubscriptionActionType.GET_SUBSCRIPTION,
  payload: subscriptionId
})

export const getSubscriptionSuccessAction = (subscription: Subscription) => ({
  type: SubscriptionActionType.GET_SUBSCRIPTION_SUCCESS,
  payload: subscription
})

export const createSubscriptionAction = (subscription: Subscription) => ({
  type: SubscriptionActionType.CREATE,
  payload: subscription
})

export const createSubscriptionSuccessAction = (subscription: Subscription) => ({
  type: SubscriptionActionType.CREATE_SUCCESS,
  payload: subscription
})

export const updateSubscriptionAction = (subscription: Subscription) => ({
  type: SubscriptionActionType.UPDATE,
  payload: subscription
})

export const updateSubscriptionSuccessAction = (subscription: Subscription) => ({
  type: SubscriptionActionType.UPDATE_SUCCESS,
  payload: subscription
})

export const resetSubscriptionAction = () => ({
  type: SubscriptionActionType.RESET_SUBSCRIPTION
})

export const getSubscriptionProductListAction = (subscriptionId: string) => ({
  type: SubscriptionActionType.GET_PRODUCT_LIST,
  payload: subscriptionId
})

export interface ProductListParams {
  total: number
  products: SubscriptionProduct[]
}

export const getSubscriptionProductListSuccessAction = (payload: ProductListParams) => ({
  type: SubscriptionActionType.GET_PRODUCT_LIST_SUCCESS,
  payload
})
