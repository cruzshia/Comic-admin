import WorksCampaign from '@src/models/comics/worksCampaign'

export enum WorksCampaignActionType {
  GET_CAMPAIGN = '@ComicsWorksCampaign/GET_CAMPAIGN',
  GET_CAMPAIGN_SUCCESS = '@ComicsWorksCampaign/GET_CAMPAIGN_SUCCESS',
  GET_CAMPAIGN_ERROR = '@ComicsWorksCampaign/GET_CAMPAIGN_ERROR',
  RESET_CAMPAIGN = '@ComicsWorksCampaign/RESET_CAMPAIGN',

  CREATE = '@ComicsWorksCampaign/CREATE',
  CREATE_SUCCESS = '@ComicsWorksCampaign/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsWorksCampaign/CREATE_ERROR',

  UPDATE = '@ComicsWorksCampaign/UPDATE',
  UPDATE_SUCCESS = '@ComicsWorksCampaign/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsWorksCampaign/UPDATE_ERROR'
}

export const getWorksCampaignAction = (campaignId: string) => ({
  type: WorksCampaignActionType.GET_CAMPAIGN,
  payload: campaignId
})

export const getWorksCampaignSuccessAction = (campaign: WorksCampaign) => ({
  type: WorksCampaignActionType.GET_CAMPAIGN_SUCCESS,
  payload: campaign
})

export const createWorksCampaignAction = (campaign: WorksCampaign) => ({
  type: WorksCampaignActionType.CREATE,
  payload: campaign
})

export const createWorksCampaignSuccessAction = (campaign: WorksCampaign) => ({
  type: WorksCampaignActionType.CREATE_SUCCESS,
  payload: campaign
})

export const updateWorksCampaignAction = (campaign: WorksCampaign) => ({
  type: WorksCampaignActionType.UPDATE,
  payload: campaign
})

export const updateWorksCampaignSuccessAction = (campaign: WorksCampaign) => ({
  type: WorksCampaignActionType.UPDATE_SUCCESS,
  payload: campaign
})
