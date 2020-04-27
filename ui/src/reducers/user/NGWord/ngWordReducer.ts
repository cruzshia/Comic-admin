import { AnyAction } from 'redux'
import { NGWordActionType } from './ngWordActions'

export interface NGWordState {
  comment: string
  account: string
}

export const initNGWordState = {
  comment: '',
  account: ''
}
export const ngWordPreLoadState = initNGWordState

const handler: Record<string, (state: NGWordState, action: AnyAction) => NGWordState> = {
  [NGWordActionType.GET_SUCCESS]: (state: NGWordState, action: AnyAction): NGWordState => ({
    ...state,
    comment: action.payload.comment,
    account: action.payload.account
  }),
  [NGWordActionType.UPDATE_SUCCESS]: (state: NGWordState, action: AnyAction): NGWordState => ({
    ...state,
    comment: action.payload.comment,
    account: action.payload.account
  })
}

export default function ngWordReducer(state = initNGWordState, action: AnyAction) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
