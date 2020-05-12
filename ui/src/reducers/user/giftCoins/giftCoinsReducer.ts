import { GiftCoinsActionType } from './giftCoinsAction'
import { GiftCoinsCsvLog } from '@src/models/user/giftCoins'
import { ActionType } from '../../types'

export interface GiftCoinsState {
  csvLogList: GiftCoinsCsvLog[]
  csvLogTotal: number
}

export const initState: GiftCoinsState = {
  csvLogList: [],
  csvLogTotal: 0
}
export const GiftCoinsPreLoadState = initState

const handler: Record<string, (state: GiftCoinsState, action: ActionType<any>) => GiftCoinsState> = {
  [GiftCoinsActionType.GET_CSV_LOG_LIST_SUCCESS]: (state: GiftCoinsState, action: ActionType<GiftCoinsCsvLog>) => ({
    ...state,
    csvLogList: action.payload,
    csvLogTotal: action.payload.length
  })
}
export default function giftCoinsReducer(state = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
