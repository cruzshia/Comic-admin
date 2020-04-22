import { combineReducers } from 'redux'
import userReducer, { UserState, userPreloadState } from './user/userReducer'
import workReducer, { WorkState, WorkPreloadState } from './comics/work/workReducer'
import displaySettingReducer, {
  DisplaySettingState,
  DisplaySettingPreloadState
} from './application/displaySetting/displaySettingReducer'
import coinProductReducer, {
  CoinProductPreloadState,
  CoinProductState
} from './application/coinProduct/coinProductReducer'

export interface StoreState {
  user: UserState
  work: WorkState

  displaySetting: DisplaySettingState
  coinProduct: CoinProductState
}

export const storePreloadState: StoreState = {
  user: userPreloadState,
  work: WorkPreloadState,

  displaySetting: DisplaySettingPreloadState,
  coinProduct: CoinProductPreloadState
}

export default combineReducers<StoreState>({
  user: userReducer,
  work: workReducer,

  displaySetting: displaySettingReducer,
  coinProduct: coinProductReducer
})
