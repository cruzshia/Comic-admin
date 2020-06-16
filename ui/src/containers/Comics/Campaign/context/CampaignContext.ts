import { createContext } from 'react'
import { AssociatedCampaign, Campaign } from '@src/models/comics/campaign'
import Paging from '@src/models/paging'

interface CampaignContext {
  campaignList: Campaign[]
  currentCampaign?: Campaign
  campaignTotal: number
  associatedCampaignList: AssociatedCampaign[]
  associatedCampaignTotal: number
}

export default createContext<CampaignContext>({
  campaignList: [],
  campaignTotal: 0,
  associatedCampaignList: [],
  associatedCampaignTotal: 0
})

interface ActionContext {
  onGetCampaignList: (params?: Object) => void
  onGetAssociatedCampaignList: (campaignId: number, query: Paging) => void
  onGetCampaign: (campaignId: string) => void
  onCreateCampaign: (campaign: Campaign) => void
  onUpdateCampaign: (campaign: Campaign) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetCampaignList: () => {},
  onGetAssociatedCampaignList: () => {},
  onGetCampaign: () => {},
  onCreateCampaign: () => {},
  onUpdateCampaign: () => {}
})
