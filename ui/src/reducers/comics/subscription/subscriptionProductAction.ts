import { SubscriptionProduct } from '@src/models/comics/subscription'

export enum SubscriptionProductActionType {
  GET_PRODUCT_LIST = '@ComicsSubscriptionProduct/GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_SUCCESS = '@ComicsSubscriptionProduct/GET_PRODUCT_LIST_SUCCESS',
  GET_PRODUCT_LIST_ERROR = '@ComicsSubscriptionProduct/GET_PRODUCT_LIST_ERROR',

  CREATE_PRODUCT = '@ComicsSubscriptionProduct/CREATE_PRODUCT',
  CREATE_PRODUCT_SUCCESS = '@ComicsSubscriptionProduct/CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_ERROR = '@ComicsSubscriptionProduct/CREATE_PRODUCT_ERROR'
}

export const getSubscriptionProductListAction = (subscriptionId: string) => ({
  type: SubscriptionProductActionType.GET_PRODUCT_LIST,
  payload: subscriptionId
})

export interface ProductListParams {
  total: number
  products: SubscriptionProduct[]
}

export const getSubscriptionProductListSuccessAction = (payload: ProductListParams) => ({
  type: SubscriptionProductActionType.GET_PRODUCT_LIST_SUCCESS,
  payload
})

export const createSubscriptionProductAction = (subscriptionProduct: SubscriptionProduct) => ({
  type: SubscriptionProductActionType.CREATE_PRODUCT,
  payload: subscriptionProduct
})

export const createSubscriptionProductSuccessAction = (subscriptionProduct: SubscriptionProduct) => ({
  type: SubscriptionProductActionType.CREATE_PRODUCT_SUCCESS,
  payload: subscriptionProduct
})
