import { AnyAction } from 'redux'
import NGWord from '@src/models/user/NGWord'
import { NGWordActionType } from './ngWordActions'

export interface NGWordState {
  ngWord: NGWord
}

export const initNGWordState = {
  ngWord: ''
}
export const ngWordPreLoadState = initNGWordState

const handler: Record<string, (state: NGWordState, action: AnyAction) => NGWordState> = {
  [NGWordActionType.GET_NGWORD_SUCCESS]: (state: NGWordState, action: AnyAction) => ({
    ...state,
    ngWord: action.payload
  }),
  [NGWordActionType.UPDATE_NGWORD_SUCCESS]: (state: NGWordState, action: AnyAction) => ({
    ...state,
    ngWord: action.payload
  })
}

export default function ngWordReducer(state = initNGWordState, action: AnyAction) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
