import { combineEpics } from 'redux-observable'
import profileEpics from './user/profileEpics'
import workEpics from './comics/work/workEpics'
import contentEpics from './comics/content/contentEpics'
import authorEpics from './comics/author/authorEpics'
import displaySettingEpics from './application/displaySetting/displaySettingEpics'
import commentEpics from './user/comment/commentEpics'
import ngWordEpics from './user/NGWord/ngWordEpics'
import coinProductEpics from './application/coinProduct/coinProductEpics'
import pushNotificationEpics from './application/pushNotification/pushNotificationEpics'
import userEpics from './user/user/userEpics'
import applicationInfoEpics from './application/applicationInfo/applicationInfoEpics'
import coinDeliveryEventEpics from './application/coinDeliveryEvent/coinDeliveryEventEpics'

export default combineEpics(
  ...profileEpics,
  ...workEpics,
  ...contentEpics,
  ...authorEpics,

  ...displaySettingEpics,
  ...coinProductEpics,
  ...pushNotificationEpics,
  ...applicationInfoEpics,
  ...coinDeliveryEventEpics,

  ...userEpics,
  ...commentEpics,
  ...ngWordEpics
)
