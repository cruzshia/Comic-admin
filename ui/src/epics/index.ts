import { combineEpics } from 'redux-observable'
import userEpics from './user/userEpics'
import workEpics from './comics/work/workEpics'

export default combineEpics(...userEpics, ...workEpics)
