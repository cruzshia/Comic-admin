import { createContext } from 'react'

interface ContentsCampaignContext {
  contentsCampaignList: any[]
}

export default createContext<ContentsCampaignContext>({
  contentsCampaignList: []
})
