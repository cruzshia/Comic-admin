import { CommentActionType } from './commentAction'
import UserComment from '@src/models/user/comment'
import { ActionType } from '../../types'

export interface CommentState {
  CommentList: UserComment[]
  currentComment?: UserComment
}

const InitState = {
  CommentList: []
}

export const CommentPreloadState = InitState

const handlers: Record<string, (state: CommentState, action: ActionType<any>) => CommentState> = {
  [CommentActionType.GET_LIST_SUCCESS]: (state = InitState, action: ActionType<UserComment[]>) => ({
    ...state,
    CommentList: action.payload
  }),
  [CommentActionType.GET_COMMENT_SUCCESS]: (state = InitState, action: ActionType<UserComment>) => ({
    ...state,
    currentComment: action.payload
  }),
  [CommentActionType.UPDATE_SUCCESS]: (state = InitState, action: ActionType<UserComment>) => ({
    ...state,
    currentComment: action.payload
  })
}

export default function commentReducer(state: CommentState = InitState, action: ActionType<UserComment>) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
