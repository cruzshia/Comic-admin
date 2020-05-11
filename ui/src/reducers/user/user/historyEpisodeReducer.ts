import HistoryEpisode from '@src/models/user/historyEpisode'
import { HistoryEpisodeActionType } from './historyEpisodeActions'
import { ActionType } from '../../types'

export interface HistoryEpisodeState {
  historyEpisodeList: HistoryEpisode[]
  currentHistoryEpisode?: HistoryEpisode
  historyEpisodeTotal: number
}

const initState: HistoryEpisodeState = {
  historyEpisodeList: [],
  historyEpisodeTotal: 0
}

export const HistoryEpisodePreloadState = initState

const updateCurrentHistoryHandler = (
  state: HistoryEpisodeState = initState,
  action: ActionType<HistoryEpisode>
): HistoryEpisodeState => {
  return {
    ...state,
    currentHistoryEpisode: action.payload
  }
}

const handler: Record<string, (state: HistoryEpisodeState, action: ActionType<any>) => HistoryEpisodeState> = {
  [HistoryEpisodeActionType.GET_LIST_SUCCESS]: (
    state: HistoryEpisodeState = initState,
    action: ActionType<HistoryEpisode[]>
  ): HistoryEpisodeState => {
    return {
      ...state,
      historyEpisodeList: action.payload,
      historyEpisodeTotal: action.payload.length
    }
  },
  [HistoryEpisodeActionType.GET_HISTORY_EPISODE_SUCCESS]: updateCurrentHistoryHandler
}

export default function historyEpisodeReducer(state: HistoryEpisodeState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
