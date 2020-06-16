import { createContext } from 'react'
import { WorksCampaign, WorkCampaignCreate } from '@src/models/comics/worksCampaign'

interface WorksCampaignContext {
  currentCampaign?: WorksCampaign
}

export default createContext<WorksCampaignContext>({})

interface ActionContext {
  onGetWorksCampaign: (campaignId: string) => void
  onCreateWorksCampaign: (campaign: WorkCampaignCreate) => void
  onUpdateWorksCampaign: (campaign: WorkCampaignCreate) => void
  onResetWorksCampaign: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetWorksCampaign: () => {},
  onCreateWorksCampaign: () => {},
  onUpdateWorksCampaign: () => {},
  onResetWorksCampaign: () => {}
})
