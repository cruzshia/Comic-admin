import { createContext } from 'react'
import Campaign, { SubCampaign } from '@src/models/comics/campaign'

interface CampaignContext {
  campaignList: Campaign[]
  currentCampaign?: Campaign
  campaignTotal: number
  subCampaignList: SubCampaign[]
  subCampaignTotal: number
}

export default createContext<CampaignContext>({
  campaignList: [],
  campaignTotal: 0,
  subCampaignList: [],
  subCampaignTotal: 0
})

interface ActionContext {
  onGetCampaignList: () => void
  onGetSubCampaignList: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetCampaignList: () => {},
  onGetSubCampaignList: () => {}
})
