import { combineReducers } from 'redux'
import userReducer, { UserState } from './user/userReducer'

export interface StoreState {
  user: UserState
}

export default combineReducers<StoreState>({
  user: userReducer
})
