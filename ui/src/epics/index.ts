import { combineEpics } from 'redux-observable'
import profileEpics from './user/profileEpics'
import workEpics from './comics/work/workEpics'
import contentEpics from './comics/content/contentEpics'
import displaySettingEpics from './application/displaySetting/displaySettingEpics'
import commentEpics from './user/comment/commentEpics'
import coinProductEpics from './application/coinProduct/coinProductEpics'
import pushNotificationEpics from './application/pushNotification/pushNotificationEpics'
import userEpics from './user/user/userEpics'

export default combineEpics(
  ...profileEpics,
  ...workEpics,
  ...contentEpics,
  ...displaySettingEpics,
  ...coinProductEpics,
  ...pushNotificationEpics,
  ...userEpics,
  ...commentEpics
)
