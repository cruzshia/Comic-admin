import WorkDetail, { Work, WorkKeys } from '@src/models/comics/work'
import ImportLog from '@src/models/importLog'
import { WorkActionType, ListParams } from './workActions'
import { defaultAdTypes } from '../constant'
import { ActionType } from '../../types'

export interface WorkState {
  workList: Work[]
  workTotal: number
  currentWork?: WorkDetail
  importLogList: ImportLog[]
  logTotal: number
}

const initState: WorkState = {
  workList: [],
  workTotal: 0,
  importLogList: [],
  logTotal: 0
}

export const emptyWork = {
  [WorkKeys.ReturnAdRevenue]: false,
  [WorkKeys.AuthorIds]: [''],
  [WorkKeys.AdSetting]: [defaultAdTypes]
}

export const WorkPreloadState = initState

const updateCurrentWorkHandler = (state: WorkState, action: ActionType<any>): WorkState => ({
  ...state,
  currentWork: action.payload
})

const handler: Record<string, (state: WorkState, action: ActionType<any>) => WorkState> = {
  [WorkActionType.GET_LIST_SUCCESS]: (state: WorkState = initState, action: ActionType<ListParams>): WorkState => {
    return {
      ...state,
      workList: action.payload.works,
      workTotal: action.payload.total_count
    }
  },
  [WorkActionType.UPDATE_SUCCESS]: updateCurrentWorkHandler,
  [WorkActionType.GET_WORK_SUCCESS]: updateCurrentWorkHandler,
  [WorkActionType.CREATE_SUCCESS]: updateCurrentWorkHandler,
  [WorkActionType.RESET_WORK]: updateCurrentWorkHandler,
  [WorkActionType.GET_CSV_LOG_LIST_SUCCESS]: (
    state: WorkState = initState,
    action: ActionType<ImportLog[]>
  ): WorkState => {
    return {
      ...state,
      importLogList: action.payload,
      logTotal: action.payload.length
    }
  }
}

export default function workReducer(state: WorkState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
