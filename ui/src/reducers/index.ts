import { combineReducers } from 'redux'
import profileReducer, { ProfileState, ProfilePreloadState } from './user/profileReducer'
import workReducer, { WorkState, WorkPreloadState } from './comics/work/workReducer'
import commentReducer, { CommentState, CommentPreloadState } from './user/comment/commentReducer'
import ngWordReducer, { NGWordState, ngWordPreLoadState } from './user/NGWord/ngWordReducer'
import contentReducer, { ContentState, ContentPreloadState } from './comics/content/contentReducer'
import authorReducer, { AuthorState, AuthorPreloadState } from './comics/author/authorReducer'
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
import coinDeliveryEventReducer, {
  CoinDeliveryEventState,
  CoinDeliveryEventPreloadState
} from './application/coinDeliveryEvent/coinDeliveryEventReducer'

export interface StoreState {
  profile: ProfileState
  work: WorkState
  content: ContentState
  author: AuthorState

  displaySetting: DisplaySettingState
  coinProduct: CoinProductState
  pushNotification: PushNotificationState
  coinDeliveryEvent: CoinDeliveryEventState

  user: UserState
  comment: CommentState
  ngWord: NGWordState
}

export const storePreloadState: StoreState = {
  profile: ProfilePreloadState,
  work: WorkPreloadState,
  content: ContentPreloadState,
  author: AuthorPreloadState,

  displaySetting: DisplaySettingPreloadState,
  coinProduct: CoinProductPreloadState,
  pushNotification: PushNotificationPreloadState,
  coinDeliveryEvent: CoinDeliveryEventPreloadState,

  user: UserPreloadState,
  comment: CommentPreloadState,
  ngWord: ngWordPreLoadState
}

export default combineReducers<StoreState>({
  profile: profileReducer,
  work: workReducer,
  content: contentReducer,
  author: authorReducer,

  displaySetting: displaySettingReducer,
  coinProduct: coinProductReducer,
  pushNotification: pushNotificationReducer,
  coinDeliveryEvent: coinDeliveryEventReducer,

  user: userReducer,
  comment: commentReducer,
  ngWord: ngWordReducer
})
