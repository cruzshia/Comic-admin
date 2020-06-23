import { createContext } from 'react'
import { WorksCampaign, WorkCampaignCreate } from '@src/models/comics/worksCampaign'
import Work from '@src/models/comics/work'

interface WorksCampaignContext {
  currentCampaign?: WorksCampaign
  currentWork?: Work
}

export default createContext<WorksCampaignContext>({})

interface ActionContext {
  onGetWorksCampaign: (campaignId: string) => void
  onCreateWorksCampaign: (campaign: WorkCampaignCreate) => void
  onUpdateWorksCampaign: (campaign: WorkCampaignCreate) => void
  onResetWorksCampaign: () => void
  onGetWork: (workId: string) => void
  onRestWork: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetWorksCampaign: () => {},
  onCreateWorksCampaign: () => {},
  onUpdateWorksCampaign: () => {},
  onResetWorksCampaign: () => {},
  onGetWork: () => {},
  onRestWork: () => {}
})
