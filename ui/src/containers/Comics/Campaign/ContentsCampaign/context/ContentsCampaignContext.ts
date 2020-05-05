import { createContext } from 'react'

interface ContentsCampaignContext {
  currentContentCampaign?: any
}

export default createContext<ContentsCampaignContext>({})

interface ActionContext {
  onGetContentCampaign: (id: string) => void
  onResetContentCampaign: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetContentCampaign: () => {},
  onResetContentCampaign: () => {}
})
