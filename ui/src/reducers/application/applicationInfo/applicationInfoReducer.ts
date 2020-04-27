import { ApplicationInfo } from '@src/models/application/applicationInfo'
import { ApplicationInfoActionType } from './applicationInfoActions'
import { ActionType } from '../../types'

export interface ApplicationInfoState {
  infoList: ApplicationInfo[]
  currentInfo?: ApplicationInfo
}

const initState: ApplicationInfoState = {
  infoList: []
}

export const emptyInfo: ApplicationInfo = {}

export const ApplicationInfoPreloadState = initState

const handler: Record<string, (state: ApplicationInfoState, action: ActionType<any>) => ApplicationInfoState> = {
  [ApplicationInfoActionType.GET_LIST_SUCCESS]: (
    state: ApplicationInfoState,
    action: ActionType<ApplicationInfo[]>
  ): ApplicationInfoState => {
    return {
      ...state,
      infoList: action.payload
    }
  }
}

export default function applicationInfoReducer(state: ApplicationInfoState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
