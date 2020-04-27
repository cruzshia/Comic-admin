import { AnyAction } from 'redux'
import { NGWordActionType } from './ngWordActions'

export interface NGWordState {
  comment: string
  account: string
}

export const initState = {
  comment: '',
  account: ''
}
export const ngWordPreLoadState = initState

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

export default function ngWordReducer(state = initState, action: AnyAction) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
