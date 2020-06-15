import { createContext } from 'react'
import Campaign, { SubCampaign } from '@src/models/comics/campaign'

interface CampaignContext {
  campaignList: Campaign[]
  currentCampaign?: Campaign
  campaignTotal: number
  associatedCampaignList: SubCampaign[]
  associatedCampaignTotal: number
}

export default createContext<CampaignContext>({
  campaignList: [],
  campaignTotal: 0,
  associatedCampaignList: [],
  associatedCampaignTotal: 0
})

interface ActionContext {
  onGetCampaignList: () => void
  onGetSubCampaignList: () => void
  onGetCampaign: (campaignId: string) => void
  onCreateCampaign: (campaignId: Campaign) => void
  onUpdateCampaign: (campaignId: Campaign) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetCampaignList: () => {},
  onGetSubCampaignList: () => {},
  onGetCampaign: () => {},
  onCreateCampaign: () => {},
  onUpdateCampaign: () => {}
})
