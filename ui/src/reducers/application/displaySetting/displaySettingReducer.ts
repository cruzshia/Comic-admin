import { DisplaySetting } from '@src/models/application/displaySetting'
import { DisplaySettingActionType } from './displaySettingActions'
import { ActionType } from '../../types'

export interface DisplaySettingState {
  settingList: DisplaySetting[]
  settingTotal: number
  currentSetting?: DisplaySetting
}

const initState: DisplaySettingState = {
  settingList: [],
  settingTotal: 0
}

export const emptyDisplaySetting: DisplaySetting = {}

export const DisplaySettingPreloadState = initState

const updateCurrentSettingHandler = (
  state: DisplaySettingState,
  action: ActionType<DisplaySetting | undefined>
): DisplaySettingState => {
  return {
    ...state,
    currentSetting: action.payload
  }
}

const handler: Record<string, (state: DisplaySettingState, action: ActionType<any>) => DisplaySettingState> = {
  [DisplaySettingActionType.GET_LIST_SUCCESS]: (
    state: DisplaySettingState,
    action: ActionType<DisplaySetting[]>
  ): DisplaySettingState => {
    return {
      ...state,
      settingList: action.payload,
      settingTotal: action.payload.length
    }
  },
  [DisplaySettingActionType.RESET_CURRENT]: updateCurrentSettingHandler,
  [DisplaySettingActionType.CREATE_SUCCESS]: updateCurrentSettingHandler,
  [DisplaySettingActionType.GET_SETTING_SUCCESS]: updateCurrentSettingHandler,
  [DisplaySettingActionType.UPDATE_SUCCESS]: updateCurrentSettingHandler
}

export default function displaySettingReducer(state: DisplaySettingState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
