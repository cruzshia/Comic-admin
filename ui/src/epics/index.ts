import { combineEpics } from 'redux-observable'
import userEpics from './user/userEpics'
import workEpics from './comics/work/workEpics'
import displaySettingEpics from './application/displaySetting/displaySettingEpics'

export default combineEpics(...userEpics, ...workEpics, ...displaySettingEpics)
