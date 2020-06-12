import { CoinProduct, CoinProductRequestBody } from '@src/models/application/coinProduct'

export enum CoinProductActionType {
  GET_LIST = '@AppCoinProduct/GET_LIST',
  GET_LIST_SUCCESS = '@AppCoinProduct/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@AppCoinProduct/GET_LIST_ERROR',

  GET = '@AppCoinProduct/GET',
  GET_SUCCESS = '@AppCoinProduct/GET_SUCCESS',
  GET_ERROR = '@AppCoinProduct/GET_ERROR',

  CREATE = '@AppCoinProduct/CREATE',
  CREATE_SUCCESS = '@AppCoinProduct/CREATE_SUCCESS',
  CREATE_ERROR = '@AppCoinProduct/CREATE_ERROR',

  UPDATE = '@AppCoinProduct/UPDATE',
  UPDATE_SUCCESS = '@AppCoinProduct/UPDATE_SUCCESS',
  UPDATE_ERROR = '@AppCoinProduct/UPDATE_ERROR',

  RESET_CURRENT = '@AppCoinProduct/RESET_CURRENT'
}

export const getCoinProductListAction = () => ({
  type: CoinProductActionType.GET_LIST
})

export interface ListParams {
  coin_products: CoinProduct[]
  total_count: number
}

export const getCoinProductListSuccessAction = (payload: ListParams) => ({
  type: CoinProductActionType.GET_LIST_SUCCESS,
  payload
})

export const getCoinProductAction = (coinProductId: string) => ({
  type: CoinProductActionType.GET,
  payload: coinProductId
})

export const getCoinProductSuccessAction = (payload: CoinProduct) => ({
  type: CoinProductActionType.GET_SUCCESS,
  payload
})

export const createCoinProductAction = (payload: CoinProductRequestBody) => ({
  type: CoinProductActionType.CREATE,
  payload
})

export const createCoinProductSuccessAction = (coinProduct: CoinProduct) => ({
  type: CoinProductActionType.CREATE_SUCCESS,
  payload: coinProduct
})

export const updateCoinProductAction = (payload: CoinProduct) => ({
  type: CoinProductActionType.UPDATE,
  payload
})

export const updateCoinProductSuccessAction = (coinProduct: CoinProduct) => ({
  type: CoinProductActionType.UPDATE_SUCCESS,
  payload: coinProduct
})

export const resetCoinProductAction = () => ({
  type: CoinProductActionType.RESET_CURRENT
})
