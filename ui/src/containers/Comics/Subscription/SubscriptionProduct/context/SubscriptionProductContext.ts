import { createContext } from 'react'
import { SubscriptionProduct } from '@src/models/comics/subscription'

interface ActionContext {
  onCreateSubscriptionProduct: (data: SubscriptionProduct) => void
}

export const ActionContext = createContext<ActionContext>({
  onCreateSubscriptionProduct: () => {}
})
