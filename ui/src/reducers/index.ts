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
import pushNotificationReducer, {
  PushNotificationState,
  PushNotificationPreloadState
} from './application/pushNotification/pushNotificationReducer'

export interface StoreState {
  user: UserState
  work: WorkState

  displaySetting: DisplaySettingState
  coinProduct: CoinProductState
  pushNotification: PushNotificationState
}

export const storePreloadState: StoreState = {
  user: userPreloadState,
  work: WorkPreloadState,

  displaySetting: DisplaySettingPreloadState,
  coinProduct: CoinProductPreloadState,
  pushNotification: PushNotificationPreloadState
}

export default combineReducers<StoreState>({
  user: userReducer,
  work: workReducer,

  displaySetting: displaySettingReducer,
  coinProduct: coinProductReducer,
  pushNotification: pushNotificationReducer
})
