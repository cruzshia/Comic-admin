import Author from '@src/models/comics/author'
import { AuthorActionType } from './authorActions'
import { ActionType } from '../../types'

export interface AuthorState {
  authorList: Author[]
  authorTotal: number
  currentAuthor?: Author
}

const initState: AuthorState = {
  authorList: [],
  authorTotal: 0
}

export const AuthorPreloadState = initState

const updateCurrentAuthorHandler = (state: AuthorState, action: ActionType<any>): AuthorState => ({
  ...state,
  currentAuthor: action.payload
})

const handler: Record<string, (state: AuthorState, action: ActionType<any>) => AuthorState> = {
  [AuthorActionType.GET_LIST_SUCCESS]: (state: AuthorState = initState, action: ActionType<Author[]>): AuthorState => {
    return {
      ...state,
      authorList: action.payload,
      authorTotal: action.payload.length
    }
  },
  [AuthorActionType.RESET_AUTHOR]: (state: AuthorState = initState): AuthorState => ({
    ...state,
    currentAuthor: undefined
  }),
  [AuthorActionType.GET_AUTHOR_SUCCESS]: updateCurrentAuthorHandler,
  [AuthorActionType.CREATE_SUCCESS]: updateCurrentAuthorHandler,
  [AuthorActionType.UPDATE_SUCCESS]: updateCurrentAuthorHandler
}

export default function authorReducer(state: AuthorState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
