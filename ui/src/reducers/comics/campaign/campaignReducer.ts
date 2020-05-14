import Campaign, { SubCampaign } from '@src/models/comics/campaign'
import { CampaignActionType } from './campaignActions'
import { ActionType } from '../../types'

export interface CampaignState {
  campaignList: Campaign[]
  subCampaignList: SubCampaign[]
  currentCampaign?: Campaign
  campaignTotal: number
  subCampaignTotal: number
}

const initState: CampaignState = {
  campaignList: [],
  subCampaignList: [],
  campaignTotal: 0,
  subCampaignTotal: 0
}

export const CampaignPreloadState = initState

const updateCurrentCampaignHandler = (state: CampaignState, action: ActionType<any>): CampaignState => ({
  ...state,
  currentCampaign: action.payload
})

const handler: Record<string, (state: CampaignState, action: ActionType<any>) => CampaignState> = {
  [CampaignActionType.GET_LIST_SUCCESS]: (
    state: CampaignState = initState,
    action: ActionType<Campaign[]>
  ): CampaignState => {
    return {
      ...state,
      campaignList: action.payload,
      campaignTotal: action.payload.length
    }
  },
  [CampaignActionType.UPDATE_SUCCESS]: updateCurrentCampaignHandler,
  [CampaignActionType.GET_CAMPAIGN_SUCCESS]: updateCurrentCampaignHandler,
  [CampaignActionType.CREATE_SUCCESS]: updateCurrentCampaignHandler
}

export default function campaignReducer(state: CampaignState = initState, action: ActionType<any>) {
  if (handler.hasOwnProperty(action.type)) {
    return handler[action.type](state, action)
  }
  return state
}
