import { createContext } from 'react'

interface WorksCampaignCallbackContext {
  onSubmit: () => void
}

export default createContext<WorksCampaignCallbackContext>({
  onSubmit: () => {}
})
