import { createContext } from 'react'
import Subscription from '@src/models/comics/subscription'

interface Context {
  subscriptionList: any[]
  subscriptionTotal: number
  currentSubscription?: any
}

export default createContext<Context>({ subscriptionList: [], subscriptionTotal: 0, currentSubscription: {} })

interface ActionContext {
  onGetSubscriptionList: () => void
  onGetSubscription: (id: string) => void
  onCreateSubscription: (data: Subscription) => void
  onUpdateSubscription: (data: Subscription) => void
  onResetSubscription: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetSubscriptionList: () => {},
  onGetSubscription: () => {},
  onCreateSubscription: () => {},
  onUpdateSubscription: () => {},
  onResetSubscription: () => {}
})
