import { createContext } from 'react'

interface Context {
  subscriptionList: any[]
  subscriptionTotal: number
  currentSubscription?: any
}

export default createContext<Context>({ subscriptionList: [], subscriptionTotal: 0, currentSubscription: {} })
