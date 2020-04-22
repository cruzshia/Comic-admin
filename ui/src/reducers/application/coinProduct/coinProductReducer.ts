import { CoinProduct } from '@src/models/application/coinProduct'
import { CoinProductActionType } from './coinProductActions'
import { ActionType } from '../../types'

export interface CoinProductState {
  productList: CoinProduct[]
  currentProduct?: CoinProduct
}

const initState: CoinProductState = {
  productList: []
}

export const emptySetting: CoinProduct = {}

export const CoinProductPreloadState = initState

const handler: Record<string, (state: CoinProductState, action: ActionType<any>) => CoinProductState> = {
  [CoinProductActionType.GET_LIST_SUCCESS]: (
    state: CoinProductState,
    action: ActionType<CoinProduct[]>
  ): CoinProductState => {
    return {
      ...state,
      productList: action.payload
    }
  }
}

export default function coinProductReducer(state: CoinProductState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
