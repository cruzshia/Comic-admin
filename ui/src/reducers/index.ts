import { combineReducers } from 'redux'
import userReducer, { UserState, userPreloadState } from './user/userReducer'
import workReducer, { WorkState, WorkPreloadState } from './comics/work/workReducer'
import displaySettingReducer, {
  DisplaySettingState,
  DisplaySettingPreloadState
} from './application/displaySetting/displaySettingReducer'

export interface StoreState {
  user: UserState
  work: WorkState
  displaySetting: DisplaySettingState
}

export const storePreloadState: StoreState = {
  user: userPreloadState,
  work: WorkPreloadState,
  displaySetting: DisplaySettingPreloadState
}

export default combineReducers<StoreState>({
  user: userReducer,
  work: workReducer,
  displaySetting: displaySettingReducer
})
