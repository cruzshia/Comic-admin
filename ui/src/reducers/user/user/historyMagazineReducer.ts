import HistoryMagazine from '@src/models/user/historyMagazine'
import { HistoryMagazineActionType } from './historyMagazineActions'
import { ActionType } from '../../types'

export interface HistoryMagazineState {
  historyMagazineList: HistoryMagazine[]
  currentHistoryMagazine?: HistoryMagazine
  historyMagazineTotal: number
}

const initState: HistoryMagazineState = {
  historyMagazineList: [],
  historyMagazineTotal: 0
}

export const HistoryMagazinePreloadState = initState

const updateCurrentHistoryHandler = (
  state: HistoryMagazineState = initState,
  action: ActionType<HistoryMagazine>
): HistoryMagazineState => {
  return {
    ...state,
    currentHistoryMagazine: action.payload
  }
}

const handler: Record<string, (state: HistoryMagazineState, action: ActionType<any>) => HistoryMagazineState> = {
  [HistoryMagazineActionType.GET_LIST_SUCCESS]: (
    state: HistoryMagazineState = initState,
    action: ActionType<HistoryMagazine[]>
  ): HistoryMagazineState => {
    return {
      ...state,
      historyMagazineList: action.payload,
      historyMagazineTotal: action.payload.length
    }
  },
  [HistoryMagazineActionType.GET_HISTORY_MAGAZINE_SUCCESS]: updateCurrentHistoryHandler,
  [HistoryMagazineActionType.RESET_HISTORY_MAGAZINE]: updateCurrentHistoryHandler
}

export default function historyMagazineReducer(state: HistoryMagazineState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
