import { AssociatedCampaign, Campaign } from '@src/models/comics/campaign'
import { CampaignActionType, CampaignListParams, CampaignSubListParams } from './campaignActions'
import { ActionType } from '../../types'

export interface CampaignState {
  campaignList: Campaign[]
  currentCampaign?: Campaign
  campaignTotal: number
  associatedCampaignList: AssociatedCampaign[]
  associatedCampaignTotal: number
}

const initState: CampaignState = {
  campaignList: [],
  campaignTotal: 0,
  associatedCampaignList: [],
  associatedCampaignTotal: 0
}

export const CampaignPreloadState = initState

const updateCurrentCampaignHandler = (state: CampaignState, action: ActionType<any>): CampaignState => ({
  ...state,
  currentCampaign: action.payload
})

const handler: Record<string, (state: CampaignState, action: ActionType<any>) => CampaignState> = {
  [CampaignActionType.GET_LIST_SUCCESS]: (
    state: CampaignState = initState,
    action: ActionType<CampaignListParams>
  ): CampaignState => {
    return {
      ...state,
      campaignList: action.payload.campaigns,
      campaignTotal: action.payload.total_count
    }
  },
  [CampaignActionType.UPDATE_SUCCESS]: updateCurrentCampaignHandler,
  [CampaignActionType.GET_CAMPAIGN_SUCCESS]: updateCurrentCampaignHandler,
  [CampaignActionType.CREATE_SUCCESS]: updateCurrentCampaignHandler,
  [CampaignActionType.GET_ASSOCIATED_LIST_SUCCESS]: (
    state: CampaignState = initState,
    action: ActionType<CampaignSubListParams>
  ): CampaignState => {
    return {
      ...state,
      associatedCampaignList: action.payload.associated_campaigns,
      associatedCampaignTotal: action.payload.total_count
    }
  }
}

export default function campaignReducer(state: CampaignState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
