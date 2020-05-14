import { combineReducers } from 'redux'
import workReducer, { WorkState, WorkPreloadState } from './comics/work/workReducer'
import contentReducer, { ContentState, ContentPreloadState } from './comics/content/contentReducer'
import authorReducer, { AuthorState, AuthorPreloadState } from './comics/author/authorReducer'
import campaignReducer, { CampaignState, CampaignPreloadState } from './comics/campaign/campaignReducer'
import worksCampaignReducer, {
  WorksCampaignState,
  WorksCampaignPreloadState
} from './comics/campaign/worksCampaignReducer'
import contentsCampaignReducer, {
  ContentsCampaignState,
  ContentsCampaignPreloadState
} from './comics/campaign/contentsCampaignReducer'
import subscriptionReducer, {
  SubscriptionState,
  SubscriptionPreloadState
} from './comics/subscription/subscriptionReducer'
import profileReducer, { ProfileState, ProfilePreloadState } from './user/profileReducer'
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
import questionnaireReducer, {
  QuestionnairePreloadState,
  QuestionnaireState
} from './user/questionnaire/questionnaireReducer'
import giftCoinsReducer, { GiftCoinsPreLoadState, GiftCoinsState } from './user/giftCoins/giftCoinsReducer'
import giftComicsReducer, { GiftComicsPreloadState, GiftComicsState } from './user/giftComics/giftComicsReducer'
import inquiryReducer, { InquiryPreloadState, InquiryState } from './user/inquiry/inquiryReducer'
import historyEpisodeReducer, {
  HistoryEpisodePreloadState,
  HistoryEpisodeState
} from './user/user/historyEpisodeReducer'
import historySubscriptionReducer, {
  HistorySubscriptionPreloadState,
  HistorySubscriptionState
} from './user/user/historySubscriptionReducer'
import historyMagazineReducer, {
  HistoryMagazinePreloadState,
  HistoryMagazineState
} from './user/user/historyMagazineReducer'
import historyBonusCoinReducer, {
  HistoryBonusCoinState,
  HistoryBonusCoinPreloadState
} from './user/user/historyBonusCoinReducer'
import historyPayCoinReducer, {
  HistoryPayCoinState,
  HistoryPayCoinPreloadState
} from './user/user/historyPayCoinReducer'

export interface StoreState {
  profile: ProfileState
  work: WorkState
  content: ContentState
  author: AuthorState
  subscription: SubscriptionState
  campaign: CampaignState
  worksCampaign: WorksCampaignState
  contentsCampaign: ContentsCampaignState

  displaySetting: DisplaySettingState
  coinProduct: CoinProductState
  pushNotification: PushNotificationState
  applicationInfo: ApplicationInfoState
  coinDeliveryEvent: CoinDeliveryEventState

  user: UserState
  comment: CommentState
  ngWord: NGWordState
  notification: NotificationState
  questionnaire: QuestionnaireState
  giftCoins: GiftCoinsState
  giftComics: GiftComicsState
  inquiry: InquiryState
  historyEpisode: HistoryEpisodeState
  historySubscription: HistorySubscriptionState
  historyMagazine: HistoryMagazineState
  historyBonusCoin: HistoryBonusCoinState
  historyPayCoin: HistoryPayCoinState
}

export const storePreloadState: StoreState = {
  profile: ProfilePreloadState,
  work: WorkPreloadState,
  content: ContentPreloadState,
  author: AuthorPreloadState,
  subscription: SubscriptionPreloadState,
  campaign: CampaignPreloadState,
  worksCampaign: WorksCampaignPreloadState,
  contentsCampaign: ContentsCampaignPreloadState,

  displaySetting: DisplaySettingPreloadState,
  coinProduct: CoinProductPreloadState,
  pushNotification: PushNotificationPreloadState,
  applicationInfo: ApplicationInfoPreloadState,
  coinDeliveryEvent: CoinDeliveryEventPreloadState,

  user: UserPreloadState,
  comment: CommentPreloadState,
  ngWord: ngWordPreLoadState,
  notification: NotificationPreLoadState,
  questionnaire: QuestionnairePreloadState,
  giftCoins: GiftCoinsPreLoadState,
  giftComics: GiftComicsPreloadState,
  inquiry: InquiryPreloadState,
  historyEpisode: HistoryEpisodePreloadState,
  historySubscription: HistorySubscriptionPreloadState,
  historyMagazine: HistoryMagazinePreloadState,
  historyBonusCoin: HistoryBonusCoinPreloadState,
  historyPayCoin: HistoryPayCoinPreloadState
}

export default combineReducers<StoreState>({
  profile: profileReducer,
  work: workReducer,
  content: contentReducer,
  author: authorReducer,
  subscription: subscriptionReducer,
  campaign: campaignReducer,
  worksCampaign: worksCampaignReducer,
  contentsCampaign: contentsCampaignReducer,

  displaySetting: displaySettingReducer,
  coinProduct: coinProductReducer,
  pushNotification: pushNotificationReducer,
  applicationInfo: applicationInfoReducer,
  coinDeliveryEvent: coinDeliveryEventReducer,

  user: userReducer,
  comment: commentReducer,
  ngWord: ngWordReducer,
  notification: notificationReducer,
  questionnaire: questionnaireReducer,
  giftCoins: giftCoinsReducer,
  giftComics: giftComicsReducer,
  inquiry: inquiryReducer,
  historyEpisode: historyEpisodeReducer,
  historySubscription: historySubscriptionReducer,
  historyMagazine: historyMagazineReducer,
  historyBonusCoin: historyBonusCoinReducer,
  historyPayCoin: historyPayCoinReducer
})
