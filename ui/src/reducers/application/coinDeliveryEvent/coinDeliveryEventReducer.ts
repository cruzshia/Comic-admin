import CoinDeliveryEvent from '@src/models/application/coinDeliveryEvent'
import { CoinDeliveryEventActionType } from './coinDeliveryEventActions'
import { ActionType } from '../../types'

export interface CoinDeliveryEventState {
  eventList: CoinDeliveryEvent[]
  eventTotal: number
  currentEvent?: CoinDeliveryEvent
}

const initState: CoinDeliveryEventState = {
  eventList: [],
  eventTotal: 0
}

export const emptyCoinDeliveryEvent: CoinDeliveryEvent = { reward: [{}] }

export const CoinDeliveryEventPreloadState = initState

const updateCurrentEventHandler = (
  state: CoinDeliveryEventState,
  action: ActionType<CoinDeliveryEvent | undefined>
): CoinDeliveryEventState => {
  return {
    ...state,
    currentEvent: action.payload
  }
}

const handler: Record<string, (state: CoinDeliveryEventState, action: ActionType<any>) => CoinDeliveryEventState> = {
  [CoinDeliveryEventActionType.GET_LIST_SUCCESS]: (
    state: CoinDeliveryEventState,
    action: ActionType<CoinDeliveryEvent[]>
  ): CoinDeliveryEventState => {
    return {
      ...state,
      eventList: action.payload,
      eventTotal: action.payload.length
    }
  },
  [CoinDeliveryEventActionType.RESET_CURRENT]: updateCurrentEventHandler,
  [CoinDeliveryEventActionType.CREATE_SUCCESS]: updateCurrentEventHandler,
  [CoinDeliveryEventActionType.GET_SUCCESS]: updateCurrentEventHandler,
  [CoinDeliveryEventActionType.UPDATE_SUCCESS]: updateCurrentEventHandler
}

export default function coinDeliveryEventReducer(state: CoinDeliveryEventState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
