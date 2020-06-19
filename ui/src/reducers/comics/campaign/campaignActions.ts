import { AssociatedCampaign, Campaign } from '@src/models/comics/campaign'
import Paging from '@src/models/paging'

export enum CampaignActionType {
  GET_LIST = '@ComicsCampaign/GET_LIST',
  GET_LIST_SUCCESS = '@ComicsCampaign/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@ComicsCampaign/GET_LIST_ERROR',

  GET_SUB_LIST = '@ComicsCampaign/GET_SUB_LIST',
  GET_SUB_LIST_SUCCESS = '@ComicsCampaign/GET_SUB_LIST_SUCCESS',
  GET_SUB_LIST_ERROR = '@ComicsCampaign/GET_SUB_LIST_ERROR',

  GET_CAMPAIGN = '@ComicsCampaign/GET_CAMPAIGN',
  GET_CAMPAIGN_SUCCESS = '@ComicsCampaign/GET_CAMPAIGN_SUCCESS',
  GET_CAMPAIGN_ERROR = '@ComicsCampaign/GET_CAMPAIGN_ERROR',
  RESET_WORK = '@ComicsCampaign/RESET_WORK',

  CREATE = '@ComicsCampaign/CREATE',
  CREATE_SUCCESS = '@ComicsCampaign/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsCampaign/CREATE_ERROR',

  UPDATE = '@ComicsCampaign/UPDATE',
  UPDATE_SUCCESS = '@ComicsCampaign/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsCampaign/UPDATE_ERROR'
}

export const getCampaignListAction = (params?: Object) => ({
  type: CampaignActionType.GET_LIST,
  payload: params
})

export interface CampaignListParams {
  total_count: number
  campaigns: Campaign[]
}
export const getCampaignListSuccessAction = (payload: CampaignListParams) => ({
  type: CampaignActionType.GET_LIST_SUCCESS,
  payload
})

export const getAssociatedCampaignListAction = (campaignId: number, query: Paging) => ({
  type: CampaignActionType.GET_SUB_LIST,
  payload: { campaignId, query }
})

export interface CampaignSubListParams {
  total_count: number
  associated_campaigns: AssociatedCampaign[]
}
export const getAssociatedCampaignListSuccessAction = (payload: CampaignSubListParams) => ({
  type: CampaignActionType.GET_SUB_LIST_SUCCESS,
  payload
})

export const getCampaignAction = (campaignId: string) => ({
  type: CampaignActionType.GET_CAMPAIGN,
  payload: campaignId
})

export const getCampaignSuccessAction = (work: Campaign) => ({
  type: CampaignActionType.GET_CAMPAIGN_SUCCESS,
  payload: work
})

export const resetCampaignAction = () => ({
  type: CampaignActionType.RESET_WORK
})

export const createCampaignAction = (work: Partial<Campaign>) => ({
  type: CampaignActionType.CREATE,
  payload: work
})

export const createCampaignSuccessAction = (work: Campaign) => ({
  type: CampaignActionType.CREATE_SUCCESS,
  payload: work
})

export const updateCampaignAction = (work: Campaign) => ({
  type: CampaignActionType.UPDATE,
  payload: work
})

export const updateCampaignSuccessAction = (work: Campaign) => ({
  type: CampaignActionType.UPDATE_SUCCESS,
  payload: work
})
