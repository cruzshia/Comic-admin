import { combineEpics } from 'redux-observable'
import userEpics from './user/userEpics'

export default combineEpics(...userEpics)
