import { DisplaySetting } from '@src/models/application/displaySetting'
import { DisplaySettingActionType } from './displaySettingActions'
import { ActionType } from '../../types'

export interface DisplaySettingState {
  settingList: DisplaySetting[]
  currentSetting?: DisplaySetting
}

const initState: DisplaySettingState = {
  settingList: []
}

export const emptyDisplaySetting: DisplaySetting = {}

export const DisplaySettingPreloadState = initState

const handler: Record<string, (state: DisplaySettingState, action: ActionType<any>) => DisplaySettingState> = {
  [DisplaySettingActionType.GET_LIST_SUCCESS]: (
    state: DisplaySettingState,
    action: ActionType<DisplaySetting[]>
  ): DisplaySettingState => {
    return {
      ...state,
      settingList: action.payload
    }
  },
  [DisplaySettingActionType.CREATE_SUCCESS]: (
    state: DisplaySettingState,
    action: ActionType<DisplaySetting[]>
  ): DisplaySettingState => {
    return {
      ...state,
      currentSetting: action.payload
    }
  }
}

export default function displaySettingReducer(state: DisplaySettingState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
