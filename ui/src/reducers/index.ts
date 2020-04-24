import { combineReducers } from 'redux'
import profileReducer, { ProfileState, ProfilePreloadState } from './user/profileReducer'
import workReducer, { WorkState, WorkPreloadState } from './comics/work/workReducer'
import commentReducer, { CommentState, CommentPreloadState } from './user/comment/commentReducer'
import ngWordReducer, { NGWordState, ngWordPreLoadState } from './user/NGWord/ngWordReducer'
import contentReducer, { ContentState, ContentPreloadState } from './comics/content/contentReducer'
import displaySettingReducer, {
  DisplaySettingState,
  DisplaySettingPreloadState
} from './application/displaySetting/displaySettingReducer'
import coinProductReducer, {
  CoinProductPreloadState,
  CoinProductState
} from './application/coinProduct/coinProductReducer'
import userReducer, { UserState, UserPreloadState } from './user/user/userReducer'
import pushNotificationReducer, {
  PushNotificationState,
  PushNotificationPreloadState
} from './application/pushNotification/pushNotificationReducer'

export interface StoreState {
  profile: ProfileState
  work: WorkState
  content: ContentState

  displaySetting: DisplaySettingState
  coinProduct: CoinProductState
  pushNotification: PushNotificationState

  user: UserState
  comment: CommentState
  ngWord: NGWordState
}

export const storePreloadState: StoreState = {
  profile: ProfilePreloadState,
  work: WorkPreloadState,
  content: ContentPreloadState,

  displaySetting: DisplaySettingPreloadState,
  coinProduct: CoinProductPreloadState,
  pushNotification: PushNotificationPreloadState,

  user: UserPreloadState,
  comment: CommentPreloadState,
  ngWord: ngWordPreLoadState
}

export default combineReducers<StoreState>({
  profile: profileReducer,
  work: workReducer,
  content: contentReducer,

  displaySetting: displaySettingReducer,
  coinProduct: coinProductReducer,
  pushNotification: pushNotificationReducer,

  user: userReducer,
  comment: commentReducer,
  ngWord: ngWordReducer
})
