import { createContext } from 'react'

interface Context {
  subscriptionList: any[]
  subscriptionTotal: number
  currentSubscription?: any
}

export default createContext<Context>({ subscriptionList: [], subscriptionTotal: 0, currentSubscription: {} })

interface ActionContext {
  onGetSubscriptionList: () => void
  onGetSubscription: (id: string) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetSubscriptionList: () => {},
  onGetSubscription: () => {}
})
