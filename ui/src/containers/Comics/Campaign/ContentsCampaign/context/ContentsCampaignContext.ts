import { createContext } from 'react'

interface ContentsCampaignContext {
  contentsCampaignList: any[]
  currentContentCampaign?: any
  contentCampaignTotal: number
}

export default createContext<ContentsCampaignContext>({
  contentsCampaignList: [],
  contentCampaignTotal: 0
})
