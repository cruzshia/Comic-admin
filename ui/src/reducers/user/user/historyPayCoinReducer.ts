import HistoryPayCoin from '@src/models/user/historyPayCoin'
import { HistoryPayCoinActionType } from './historyPayCoinActions'
import { ActionType } from '../../types'

export interface HistoryPayCoinState {
  historyPayCoinList: HistoryPayCoin[]
  currentHistoryPayCoin?: HistoryPayCoin
  historyPayCoinTotal: number
}

const initState: HistoryPayCoinState = {
  historyPayCoinList: [],
  historyPayCoinTotal: 0
}

export const HistoryPayCoinPreloadState = initState

const updateCurrentHistoryHandler = (
  state: HistoryPayCoinState = initState,
  action: ActionType<HistoryPayCoin>
): HistoryPayCoinState => {
  return {
    ...state,
    currentHistoryPayCoin: action.payload
  }
}

const handler: Record<string, (state: HistoryPayCoinState, action: ActionType<any>) => HistoryPayCoinState> = {
  [HistoryPayCoinActionType.GET_LIST_SUCCESS]: (
    state: HistoryPayCoinState = initState,
    action: ActionType<HistoryPayCoin[]>
  ): HistoryPayCoinState => {
    return {
      ...state,
      historyPayCoinList: action.payload,
      historyPayCoinTotal: action.payload.length
    }
  },
  [HistoryPayCoinActionType.GET_HISTORY_PAY_COIN_SUCCESS]: updateCurrentHistoryHandler
}

export default function historyPayCoinReducer(state: HistoryPayCoinState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
