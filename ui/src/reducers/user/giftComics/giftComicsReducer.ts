import { GiftComicsCsvLog } from '@src/models/user/giftComics'
import { GiftComicsActionType } from './giftComicsAction'
import { ActionType } from '../../types'

export interface GiftComicsState {
  csvLogList: GiftComicsCsvLog[]
  csvLogTotal: number
}

const initState: GiftComicsState = {
  csvLogList: [],
  csvLogTotal: 0
}

export const GiftComicsPreloadState = initState

const handler: Record<string, (state: GiftComicsState, action: ActionType<any>) => GiftComicsState> = {
  [GiftComicsActionType.GET_CSV_LOG_LIST_SUCCESS]: (
    state: GiftComicsState,
    action: ActionType<GiftComicsCsvLog[]>
  ) => ({
    ...state,
    csvLogList: action.payload,
    csvLogTotal: action.payload.length
  })
}

export default function giftComicsReducer(state = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
