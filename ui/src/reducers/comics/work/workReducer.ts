import Work from '@src/models/comics/work'
import { WorkActionType } from './workActions'
import { ActionType } from '../../types'

export interface WorkState {
  workList: Work[]
  currentWork?: Work
}

const initState: WorkState = {
  workList: []
}

export const emptyWork: Work = { author: [''] }

export const WorkPreloadState = initState

const handler: Record<string, (state: WorkState, action: ActionType<any>) => WorkState> = {
  [WorkActionType.GET_LIST_SUCCESS]: (state: WorkState = initState, action: ActionType<Work[]>): WorkState => {
    return {
      ...state,
      workList: action.payload
    }
  },
  [WorkActionType.UPDATE_SUCCESS]: (state: WorkState = initState, action: ActionType<Work>): WorkState => {
    return {
      ...state,
      currentWork: action.payload
    }
  },
  [WorkActionType.GET_WORK_SUCCESS]: (state: WorkState = initState, action: ActionType<Work>): WorkState => {
    return {
      ...state,
      currentWork: action.payload
    }
  }
}

export default function workReducer(state: WorkState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
