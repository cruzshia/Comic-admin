import { combineEpics } from 'redux-observable'
import userEpics from './user/userEpics'
import workEpics from './comics/work/workEpics'
import contentEpics from './comics/content/contentEpics'
import displaySettingEpics from './application/displaySetting/displaySettingEpics'
import commentEpics from './user/comment/commentEpics'
import coinProductEpics from './application/coinProduct/coinProductEpics'
import pushNotificationEpics from './application/pushNotification/pushNotificationEpics'

export default combineEpics(
  ...workEpics,
  ...contentEpics,
  ...userEpics,

  ...commentEpics,

  ...displaySettingEpics,
  ...coinProductEpics,
  ...pushNotificationEpics
)
