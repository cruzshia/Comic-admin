import { createContext } from 'react'

interface WorksCampaignContext {
  campaignList: any[]
  currentCampaign?: any
  campaignTotal: number
}

export default createContext<WorksCampaignContext>({
  campaignList: [],
  campaignTotal: 0
})
