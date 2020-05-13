import HistoryBonusCoin from '@src/models/user/historyBonusCoin'
import { HistoryBonusCoinActionType } from './historyBonusCoinActions'
import { ActionType } from '../../types'

export interface HistoryBonusCoinState {
  historyBonusCoinList: HistoryBonusCoin[]
  currentHistoryBonusCoin?: HistoryBonusCoin
  historyBonusCoinTotal: number
}

const initState: HistoryBonusCoinState = {
  historyBonusCoinList: [],
  historyBonusCoinTotal: 0
}

export const HistoryBonusCoinPreloadState = initState

const updateCurrentHistoryHandler = (
  state: HistoryBonusCoinState = initState,
  action: ActionType<HistoryBonusCoin>
): HistoryBonusCoinState => {
  return {
    ...state,
    currentHistoryBonusCoin: action.payload
  }
}

const handler: Record<string, (state: HistoryBonusCoinState, action: ActionType<any>) => HistoryBonusCoinState> = {
  [HistoryBonusCoinActionType.GET_LIST_SUCCESS]: (
    state: HistoryBonusCoinState = initState,
    action: ActionType<HistoryBonusCoin[]>
  ): HistoryBonusCoinState => {
    return {
      ...state,
      historyBonusCoinList: action.payload,
      historyBonusCoinTotal: action.payload.length
    }
  },
  [HistoryBonusCoinActionType.GET_HISTORY_BONUS_CHARGE_SUCCESS]: updateCurrentHistoryHandler
}

export default function historyBonusCoinReducer(state: HistoryBonusCoinState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
