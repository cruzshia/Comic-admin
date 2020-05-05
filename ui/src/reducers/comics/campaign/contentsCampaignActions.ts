import ContentsCampaign from '@src/models/comics/contentsCampaign'

export enum ContentsCampaignActionType {
  GET_CAMPAIGN = '@ComicsContentsCampaign/GET_CAMPAIGN',
  GET_CAMPAIGN_SUCCESS = '@ComicsContentsCampaign/GET_CAMPAIGN_SUCCESS',
  GET_CAMPAIGN_ERROR = '@ComicsContentsCampaign/GET_CAMPAIGN_ERROR',
  RESET_CAMPAIGN = '@ComicsContentsCampaign/RESET_CAMPAIGN',

  CREATE = '@ComicsContentsCampaign/CREATE',
  CREATE_SUCCESS = '@ComicsContentsCampaign/CREATE_SUCCESS',
  CREATE_ERROR = '@ComicsContentsCampaign/CREATE_ERROR',

  UPDATE = '@ComicsContentsCampaign/UPDATE',
  UPDATE_SUCCESS = '@ComicsContentsCampaign/UPDATE_SUCCESS',
  UPDATE_ERROR = '@ComicsContentsCampaign/UPDATE_ERROR'
}

export const getContentsCampaignAction = (campaignId: string) => ({
  type: ContentsCampaignActionType.GET_CAMPAIGN,
  payload: campaignId
})

export const getContentsCampaignSuccessAction = (campaign: ContentsCampaign) => ({
  type: ContentsCampaignActionType.GET_CAMPAIGN_SUCCESS,
  payload: campaign
})

export const createContentsCampaignAction = (campaign: ContentsCampaign) => ({
  type: ContentsCampaignActionType.CREATE,
  payload: campaign
})

export const createContentsCampaignSuccessAction = (campaign: ContentsCampaign) => ({
  type: ContentsCampaignActionType.CREATE_SUCCESS,
  payload: campaign
})

export const updateContentsCampaignAction = (campaign: ContentsCampaign) => ({
  type: ContentsCampaignActionType.UPDATE,
  payload: campaign
})

export const updateContentsCampaignSuccessAction = (campaign: ContentsCampaign) => ({
  type: ContentsCampaignActionType.UPDATE_SUCCESS,
  payload: campaign
})

export const resetContentsCampaignAction = () => ({
  type: ContentsCampaignActionType.RESET_CAMPAIGN
})
