import { combineReducers } from 'redux'
import userReducer, { UserState, userPreloadState } from './user/userReducer'
import workReducer, { WorkState, WorkPreloadState } from './comics/work/workReducer'

export interface StoreState {
  user: UserState
  work: WorkState
}

export const storePreloadState: StoreState = {
  user: userPreloadState,
  work: WorkPreloadState
}

export default combineReducers<StoreState>({
  user: userReducer,
  work: workReducer
})
