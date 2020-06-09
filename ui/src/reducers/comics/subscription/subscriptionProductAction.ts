import { SubscriptionProduct } from '@src/models/comics/subscription'

export enum SubscriptionProductActionType {
  GET_LIST = '@ComicsSubscriptionProduct/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsSubscriptionProduct/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsSubscriptionProduct/GET_LIST_ERROR',

  CREATE = '@ComicsSubscriptionProduct/CREATE',
  CREATE_SUCCESS = '@ComicsSubscriptionProduct/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsSubscriptionProduct/CREATE_ERROR',

  GET_PRODUCT = '@ComicsSubscriptionProduct/GET_PRODUCT',
  GET_PRODUCT_SUCCESS = '@ComicsSubscriptionProduct/GET_PRODUCT_SUCCESS',
  GET_PRODUCT_ERROR = '@ComicsSubscriptionProduct/GET_PRODUCT_ERROR',

  RESET_PRODUCT = '@ComicsSubscriptionProduct/RESET_PRODUCT',

  DELETE = '@ComicsSubscriptionProduct/DELETE',
  DELETE_SUCCESS = '@ComicsSubscriptionProduct/DELETE_SUCCESS',
  DELETE_ERROR = '@ComicsSubscriptionProduct/DELETE_ERROR',

  UPDATE = '@ComicsSubscriptionProduct/UPDATE',
  UPDATE_SUCCESS = '@ComicsSubscriptionProduct/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsSubscriptionProduct/UPDATE_ERROR'
}

export const getSubscriptionProductListAction = (subscriptionId: string) => ({
  type: SubscriptionProductActionType.GET_LIST,
  payload: subscriptionId
})

export interface ProductListParams {
  total: number
  products: SubscriptionProduct[]
}

export const getSubscriptionProductListSuccessAction = (payload: ProductListParams) => ({
  type: SubscriptionProductActionType.GET_LIST_SUCCESS,
  payload
})

export const createSubscriptionProductAction = (subscriptionProduct: SubscriptionProduct) => ({
  type: SubscriptionProductActionType.CREATE,
  payload: subscriptionProduct
})

export const createSubscriptionProductSuccessAction = (subscriptionProduct: SubscriptionProduct) => ({
  type: SubscriptionProductActionType.CREATE_SUCCESS,
  payload: subscriptionProduct
})

export const getSubscriptionProductAction = (id: string) => ({
  type: SubscriptionProductActionType.GET_PRODUCT,
  payload: id
})

export const getSubscriptionProductSuccessAction = (subscriptionProduct: SubscriptionProduct) => ({
  type: SubscriptionProductActionType.GET_PRODUCT_SUCCESS,
  payload: subscriptionProduct
})

export const resetSubscriptionProductAction = () => ({
  type: SubscriptionProductActionType.RESET_PRODUCT
})

export const deleteSubscriptionProductAction = (id: string) => ({
  type: SubscriptionProductActionType.DELETE,
  payload: id
})

export const updateSubscriptionProductAction = (subscriptionProduct: SubscriptionProduct) => ({
  type: SubscriptionProductActionType.UPDATE,
  payload: subscriptionProduct
})

export const updateSubscriptionProductSuccessAction = (subscriptionProduct: SubscriptionProduct) => ({
  type: SubscriptionProductActionType.UPDATE_SUCCESS,
  payload: subscriptionProduct
})
