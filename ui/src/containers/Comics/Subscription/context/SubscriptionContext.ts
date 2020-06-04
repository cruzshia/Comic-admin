import { createContext } from 'react'
import Subscription, { SubscriptionProduct } from '@src/models/comics/subscription'

interface Context {
  subscriptionList: Subscription[]
  subscriptionTotal: number
  currentSubscription?: any
  subscriptionProductList: SubscriptionProduct[]
  subscriptionProductTotal: number
}

export default createContext<Context>({
  subscriptionList: [],
  subscriptionTotal: 0,
  currentSubscription: {},
  subscriptionProductList: [],
  subscriptionProductTotal: 0
})

interface ActionContext {
  onGetSubscriptionList: () => void
  onGetSubscription: (id: string) => void
  onCreateSubscription: (data: Subscription) => void
  onUpdateSubscription: (data: Subscription) => void
  onResetSubscription: () => void
  onGetSubscriptionProductList: (id: string) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetSubscriptionList: () => {},
  onGetSubscription: () => {},
  onCreateSubscription: () => {},
  onUpdateSubscription: () => {},
  onResetSubscription: () => {},
  onGetSubscriptionProductList: () => {}
})
