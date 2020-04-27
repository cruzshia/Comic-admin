import { CoinDeliveryEvent } from '@src/models/application/coinDeliveryEvent'
import { CoinDeliveryEventActionType } from './coinDeliveryEventActions'
import { ActionType } from '../../types'

export interface CoinDeliveryEventState {
  eventList: CoinDeliveryEvent[]
  currentEvent?: CoinDeliveryEvent
}

const initState: CoinDeliveryEventState = {
  eventList: []
}

export const emptyEvent: CoinDeliveryEvent = {}

export const CoinDeliveryEventPreloadState = initState

const handler: Record<string, (state: CoinDeliveryEventState, action: ActionType<any>) => CoinDeliveryEventState> = {
  [CoinDeliveryEventActionType.GET_LIST_SUCCESS]: (
    state: CoinDeliveryEventState,
    action: ActionType<CoinDeliveryEvent[]>
  ): CoinDeliveryEventState => {
    return {
      ...state,
      eventList: action.payload
    }
  }
}

export default function coinDeliveryEventReducer(state: CoinDeliveryEventState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
