import { combineEpics } from 'redux-observable'
import userEpics from './user/userEpics'
import workEpics from './comics/work/workEpics'
import displaySettingEpics from './application/displaySetting/displaySettingEpics'
import coinProductEpics from './application/coinProduct/coinProductEpics'
import pushNotificationEpics from './application/pushNotification/pushNotificationEpics'

export default combineEpics(
  ...workEpics,
  ...userEpics,

  ...displaySettingEpics,
  ...coinProductEpics,
  ...pushNotificationEpics
)
