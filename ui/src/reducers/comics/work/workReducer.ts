import Work from '@src/models/comics/work'
import ImportLog from '@src/models/importLog'
import { WorkActionType } from './workActions'
import { defaultAdTypes } from '../constant'
import { ActionType } from '../../types'

export interface WorkState {
  workList: Work[]
  currentWork?: Work
  importLogList: ImportLog[]
}

const initState: WorkState = {
  workList: [],
  importLogList: []
}

export const emptyWork: Work = {
  author: [''],
  advertisement: defaultAdTypes
}

export const WorkPreloadState = initState

const updateCurrentWorkHandler = (state: WorkState, action: ActionType<any>): WorkState => ({
  ...state,
  currentWork: action.payload
})

const handler: Record<string, (state: WorkState, action: ActionType<any>) => WorkState> = {
  [WorkActionType.GET_LIST_SUCCESS]: (state: WorkState = initState, action: ActionType<Work[]>): WorkState => {
    return {
      ...state,
      workList: action.payload
    }
  },
  [WorkActionType.UPDATE_SUCCESS]: updateCurrentWorkHandler,
  [WorkActionType.GET_WORK_SUCCESS]: updateCurrentWorkHandler,
  [WorkActionType.CREATE_SUCCESS]: updateCurrentWorkHandler,
  [WorkActionType.GET_CSV_LOG_LIST_SUCCESS]: (
    state: WorkState = initState,
    action: ActionType<ImportLog[]>
  ): WorkState => {
    return {
      ...state,
      importLogList: action.payload
    }
  }
}

export default function workReducer(state: WorkState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
