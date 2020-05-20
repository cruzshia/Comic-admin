import { CoinProduct } from '@src/models/application/coinProduct'
import { CoinProductActionType } from './coinProductActions'
import { ActionType } from '../../types'

export interface CoinProductState {
  productList: CoinProduct[]
  productTotal: number
  currentProduct?: CoinProduct
}

const initState: CoinProductState = {
  productList: [],
  productTotal: 0
}

export const emptyCoinProduct: CoinProduct = {}

export const CoinProductPreloadState = initState

const updateCurrentProductHandler = (state: CoinProductState, action: ActionType<CoinProduct[]>): CoinProductState => {
  return {
    ...state,
    currentProduct: action.payload
  }
}

const handler: Record<string, (state: CoinProductState, action: ActionType<any>) => CoinProductState> = {
  [CoinProductActionType.GET_LIST_SUCCESS]: (
    state: CoinProductState,
    action: ActionType<CoinProduct[]>
  ): CoinProductState => {
    return {
      ...state,
      productList: action.payload,
      productTotal: action.payload.length
    }
  },
  [CoinProductActionType.RESET_CURRENT]: (state: CoinProductState): CoinProductState => {
    return {
      ...state,
      currentProduct: undefined
    }
  },
  [CoinProductActionType.CREATE_SUCCESS]: updateCurrentProductHandler,
  [CoinProductActionType.GET_SUCCESS]: updateCurrentProductHandler,
  [CoinProductActionType.UPDATE_SUCCESS]: updateCurrentProductHandler
}

export default function coinProductReducer(state: CoinProductState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}