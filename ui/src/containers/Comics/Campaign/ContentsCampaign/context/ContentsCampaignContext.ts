import { createContext } from 'react'
import Content from '@src/models/comics/content'

interface ContentsCampaignContext {
  currentContentCampaign?: any
  currentContent?: Content
}

export default createContext<ContentsCampaignContext>({})

interface ActionContext {
  onGetContentCampaign: (id: string) => void
  onResetContentCampaign: () => void
  onGetContent: (id: string) => void
  onResetContent: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetContentCampaign: () => {},
  onResetContentCampaign: () => {},
  onGetContent: () => {},
  onResetContent: () => {}
})
