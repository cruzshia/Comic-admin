import { combineReducers } from 'redux'
import profileReducer, { ProfileState, ProfilePreloadState } from './user/profileReducer'
import workReducer, { WorkState, WorkPreloadState } from './comics/work/workReducer'
import contentReducer, { ContentState, ContentPreloadState } from './comics/content/contentReducer'
import authorReducer, { AuthorState, AuthorPreloadState } from './comics/author/authorReducer'
import worksCampaignReducer, {
  WorksCampaignState,
  WorksCampaignPreloadState
} from './comics/campaign/worksCampaignReducer'
import subscriptionReducer, {
  SubscriptionState,
  SubscriptionPreloadState
} from './comics/subscription/subscriptionReducer'
import commentReducer, { CommentState, CommentPreloadState } from './user/comment/commentReducer'
import ngWordReducer, { NGWordState, ngWordPreLoadState } from './user/NGWord/ngWordReducer'
import notificationReducer, {
  NotificationState,
  NotificationPreLoadState
} from './user/notification/notificationReducer'
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
import applicationInfoReducer, {
  ApplicationInfoPreloadState,
  ApplicationInfoState
} from './application/applicationInfo/applicationInfoReducer'
import coinDeliveryEventReducer, {
  CoinDeliveryEventState,
  CoinDeliveryEventPreloadState
} from './application/coinDeliveryEvent/coinDeliveryEventReducer'

export interface StoreState {
  profile: ProfileState
  work: WorkState
  content: ContentState
  author: AuthorState
  subscription: SubscriptionState
  worksCampaign: WorksCampaignState

  displaySetting: DisplaySettingState
  coinProduct: CoinProductState
  pushNotification: PushNotificationState
  applicationInfo: ApplicationInfoState
  coinDeliveryEvent: CoinDeliveryEventState

  user: UserState
  comment: CommentState
  ngWord: NGWordState
  notification: NotificationState
}

export const storePreloadState: StoreState = {
  profile: ProfilePreloadState,
  work: WorkPreloadState,
  content: ContentPreloadState,
  author: AuthorPreloadState,
  subscription: SubscriptionPreloadState,
  worksCampaign: WorksCampaignPreloadState,

  displaySetting: DisplaySettingPreloadState,
  coinProduct: CoinProductPreloadState,
  pushNotification: PushNotificationPreloadState,
  applicationInfo: ApplicationInfoPreloadState,
  coinDeliveryEvent: CoinDeliveryEventPreloadState,

  user: UserPreloadState,
  comment: CommentPreloadState,
  ngWord: ngWordPreLoadState,
  notification: NotificationPreLoadState
}

export default combineReducers<StoreState>({
  profile: profileReducer,
  work: workReducer,
  content: contentReducer,
  author: authorReducer,
  subscription: subscriptionReducer,
  worksCampaign: worksCampaignReducer,

  displaySetting: displaySettingReducer,
  coinProduct: coinProductReducer,
  pushNotification: pushNotificationReducer,
  applicationInfo: applicationInfoReducer,
  coinDeliveryEvent: coinDeliveryEventReducer,

  user: userReducer,
  comment: commentReducer,
  ngWord: ngWordReducer,
  notification: notificationReducer
})
