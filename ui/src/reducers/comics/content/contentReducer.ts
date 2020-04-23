import Content from '@src/models/comics/content'
import { ContentActionType } from './contentActions'
import { ActionType } from '../../types'

export interface ContentState {
  contentList: Content[]
  currentContent?: Content
}

const initState: ContentState = {
  contentList: []
}

export const ContentPreloadState = initState

const handler: Record<string, (state: ContentState, action: ActionType<any>) => ContentState> = {
  [ContentActionType.GET_LIST_SUCCESS]: (
    state: ContentState = initState,
    action: ActionType<Content[]>
  ): ContentState => {
    return {
      ...state,
      contentList: action.payload
    }
  },
  [ContentActionType.GET_CONTENT_SUCCESS]: (
    state: ContentState = initState,
    action: ActionType<Content>
  ): ContentState => {
    return {
      ...state,
      currentContent: action.payload
    }
  }
}

export default function contentReducer(state: ContentState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
