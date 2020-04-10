import { createContext } from 'react'

interface ContentsCampaignContext {
  contentsCampaignList: any[]
  currentContentCampaign?: any
}

export default createContext<ContentsCampaignContext>({
  contentsCampaignList: []
})
