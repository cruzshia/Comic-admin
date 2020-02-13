import { combineReducers } from 'redux'
import userReducer, { UserState, userPreloadState } from './user/userReducer'

export interface StoreState {
  user: UserState
}

export const storePreloadState: StoreState = {
  user: userPreloadState
}

export default combineReducers<StoreState>({
  user: userReducer
})
