import { combineEpics } from 'redux-observable'
import profileEpics from './user/profileEpics'
import workEpics from './comics/work/workEpics'
import contentEpics from './comics/content/contentEpics'
import authorEpics from './comics/author/authorEpics'
import subscriptionEpics from './comics/subscription/subscriptionEpics'
import campaignEpics from './comics/campaign/campaignEpics'
import worksCampaignEpics from './comics/campaign/worksCampaignEpics'
import contentsCampaignEpics from './comics/campaign/contentsCampaignEpics'
import displaySettingEpics from './application/displaySetting/displaySettingEpics'
import commentEpics from './user/comment/commentEpics'
import ngWordEpics from './user/NGWord/ngWordEpics'
import notificationEpics from './user/notification/notificationEpics'
import coinProductEpics from './application/coinProduct/coinProductEpics'
import pushNotificationEpics from './application/pushNotification/pushNotificationEpics'
import userEpics from './user/user/userEpics'
import historyEpisodeEpics from './user/user/historyEpisodeEpics'
import historySubscriptionEpics from './user/user/historySubscriptionEpics'
import historyMagazineEpics from './user/user/historyMagazineEpics'
import historyBonusCoinEpics from './user/user/historyBonusCoinEpics'
import historyPayCoinEpics from './user/user/historyPayCoinEpics'
import applicationInfoEpics from './application/applicationInfo/applicationInfoEpics'
import coinDeliveryEventEpics from './application/coinDeliveryEvent/coinDeliveryEventEpics'
import questionnaireEpics from './user/questionnaire/questionnaireEpics'
import inquiryEpics from './user/inquiry/inquiryEpics'
import giftCoinsEpics from './user/giftCoins/giftCoinsEpics'
import giftComicsEpics from './user/giftComics/giftComicsEpics'

export default combineEpics(
  ...profileEpics,
  ...workEpics,
  ...contentEpics,
  ...authorEpics,
  ...subscriptionEpics,
  ...campaignEpics,
  ...worksCampaignEpics,
  ...contentsCampaignEpics,

  ...displaySettingEpics,
  ...coinProductEpics,
  ...pushNotificationEpics,
  ...applicationInfoEpics,
  ...coinDeliveryEventEpics,

  ...userEpics,
  ...historyEpisodeEpics,
  ...historySubscriptionEpics,
  ...historyBonusCoinEpics,
  ...historyPayCoinEpics,
  ...historyMagazineEpics,
  ...commentEpics,
  ...ngWordEpics,
  ...notificationEpics,
  ...questionnaireEpics,
  ...inquiryEpics,
  ...giftCoinsEpics,
  ...giftComicsEpics
)
