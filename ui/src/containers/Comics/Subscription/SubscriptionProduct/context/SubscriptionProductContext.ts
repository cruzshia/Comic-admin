import { createContext } from 'react'
import { SubscriptionProduct } from '@src/models/comics/subscription'

interface Context {
  currentSubscriptionProduct?: any
}

export default createContext<Context>({})

interface ActionContext {
  onCreateSubscriptionProduct: (data: SubscriptionProduct) => void
  onGetSubscriptionProduct: (id: string) => void
  onResetSubscriptionProduct: () => void
  onDeleteSubscriptionProduct: (id: string) => void
  onUpdateSubscriptionProduct: (data: SubscriptionProduct) => void
}

export const ActionContext = createContext<ActionContext>({
  onCreateSubscriptionProduct: () => {},
  onGetSubscriptionProduct: () => {},
  onResetSubscriptionProduct: () => {},
  onDeleteSubscriptionProduct: () => {},
  onUpdateSubscriptionProduct: () => {}
})
