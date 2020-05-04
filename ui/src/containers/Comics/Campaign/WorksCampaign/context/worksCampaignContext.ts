import { createContext } from 'react'
import worksCampaign from '@src/models/comics/worksCampaign'

interface WorksCampaignContext {
  currentCampaign?: any
}

export default createContext<WorksCampaignContext>({})

interface ActionContext {
  onGetWorksCampaign: (campaignId: string) => void
  onCreateWorksCampaign: (campaign: worksCampaign) => void
  onUpdateWorksCampaign: (campaign: worksCampaign) => void
  onResetWorksCampaign: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetWorksCampaign: () => {},
  onCreateWorksCampaign: () => {},
  onUpdateWorksCampaign: () => {},
  onResetWorksCampaign: () => {}
})
