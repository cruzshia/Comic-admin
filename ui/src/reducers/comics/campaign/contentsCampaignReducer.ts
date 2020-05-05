import ContentsCampaign from '@src/models/comics/contentsCampaign'
import { ContentsCampaignActionType } from './contentsCampaignActions'
import { ActionType } from '../../types'

export interface ContentsCampaignState {
  currentCampaign?: ContentsCampaign
}

const initState: ContentsCampaignState = {}
export const ContentsCampaignPreloadState = initState

const updateCurrentCampaignHandler = (
  state: ContentsCampaignState,
  action: ActionType<any>
): ContentsCampaignState => ({
  ...state,
  currentCampaign: action.payload
})

const handler: Record<string, (state: ContentsCampaignState, action: ActionType<any>) => ContentsCampaignState> = {
  [ContentsCampaignActionType.UPDATE_SUCCESS]: updateCurrentCampaignHandler,
  [ContentsCampaignActionType.GET_CAMPAIGN_SUCCESS]: updateCurrentCampaignHandler,
  [ContentsCampaignActionType.CREATE_SUCCESS]: updateCurrentCampaignHandler,
  [ContentsCampaignActionType.RESET_CAMPAIGN]: updateCurrentCampaignHandler
}

export default function worksCampaignReducer(state: ContentsCampaignState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
