import HistorySubscription from '@src/models/user/historySubscription'
import { HistorySubscriptionActionType } from './historySubscriptionActions'
import { ActionType } from '../../types'

export interface HistorySubscriptionState {
  historySubscriptionList: HistorySubscription[]
  currentHistorySubscription?: HistorySubscription
  historySubscriptionTotal: number
}

const initState: HistorySubscriptionState = {
  historySubscriptionList: [],
  historySubscriptionTotal: 0
}

export const HistorySubscriptionPreloadState = initState

const updateCurrentHistoryHandler = (
  state: HistorySubscriptionState = initState,
  action: ActionType<HistorySubscription>
): HistorySubscriptionState => {
  return {
    ...state,
    currentHistorySubscription: action.payload
  }
}

const handler: Record<
  string,
  (state: HistorySubscriptionState, action: ActionType<any>) => HistorySubscriptionState
> = {
  [HistorySubscriptionActionType.GET_LIST_SUCCESS]: (
    state: HistorySubscriptionState = initState,
    action: ActionType<HistorySubscription[]>
  ): HistorySubscriptionState => {
    return {
      ...state,
      historySubscriptionList: action.payload,
      historySubscriptionTotal: action.payload.length
    }
  },
  [HistorySubscriptionActionType.GET_HISTORY_SUBSCRIPTION_SUCCESS]: updateCurrentHistoryHandler,
  [HistorySubscriptionActionType.RESET_HISTORY_SUBSCRIPTION]: updateCurrentHistoryHandler
}

export default function historySubscriptionReducer(
  state: HistorySubscriptionState = initState,
  action: ActionType<any>
) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
