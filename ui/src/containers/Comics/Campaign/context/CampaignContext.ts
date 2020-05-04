import { createContext } from 'react'

interface CampaignContext {
  campaignList: any[]
  currentCampaign?: any
  campaignTotal: number
}

export default createContext<CampaignContext>({
  campaignList: [],
  campaignTotal: 0
})
