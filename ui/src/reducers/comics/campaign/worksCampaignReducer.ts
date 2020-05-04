import WorksCampaign from '@src/models/comics/worksCampaign'
import { WorksCampaignActionType } from './worksCampaignActions'
import { ActionType } from '../../types'

export interface WorksCampaignState {
  currentCampaign?: WorksCampaign
}

const initState: WorksCampaignState = {}

export const WorksCampaignPreloadState = initState

const updateCurrentCampaignHandler = (state: WorksCampaignState, action: ActionType<any>): WorksCampaignState => ({
  ...state,
  currentCampaign: action.payload
})

const handler: Record<string, (state: WorksCampaignState, action: ActionType<any>) => WorksCampaignState> = {
  [WorksCampaignActionType.UPDATE_SUCCESS]: updateCurrentCampaignHandler,
  [WorksCampaignActionType.GET_CAMPAIGN_SUCCESS]: updateCurrentCampaignHandler,
  [WorksCampaignActionType.CREATE_SUCCESS]: updateCurrentCampaignHandler,
  [WorksCampaignActionType.RESET_CAMPAIGN]: updateCurrentCampaignHandler
}

export default function worksCampaignReducer(state: WorksCampaignState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
