import InfoModel, { ApplicationInfo } from '@src/models/application/applicationInfo'
import { ApplicationInfoActionType } from './applicationInfoActions'
import { ActionType } from '../../types'

export interface ApplicationInfoState {
  infoList: ApplicationInfo[]
  infoTotal: number
  currentInfo?: ApplicationInfo
}

const initState: ApplicationInfoState = {
  infoList: [],
  infoTotal: 0
}

export const emptyApplicationInfo: InfoModel = {}

export const ApplicationInfoPreloadState = initState

const updateCurrentInfoHandler = (
  state: ApplicationInfoState,
  action: ActionType<ApplicationInfo | undefined>
): ApplicationInfoState => {
  return {
    ...state,
    currentInfo: action.payload
  }
}

const handler: Record<string, (state: ApplicationInfoState, action: ActionType<any>) => ApplicationInfoState> = {
  [ApplicationInfoActionType.GET_LIST_SUCCESS]: (
    state: ApplicationInfoState,
    action: ActionType<ApplicationInfo[]>
  ): ApplicationInfoState => {
    return {
      ...state,
      infoList: action.payload,
      infoTotal: action.payload.length
    }
  },
  [ApplicationInfoActionType.RESET_CURRENT]: updateCurrentInfoHandler,
  [ApplicationInfoActionType.CREATE_SUCCESS]: updateCurrentInfoHandler,
  [ApplicationInfoActionType.GET_SUCCESS]: updateCurrentInfoHandler,
  [ApplicationInfoActionType.UPDATE_SUCCESS]: updateCurrentInfoHandler
}

export default function applicationInfoReducer(state: ApplicationInfoState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
