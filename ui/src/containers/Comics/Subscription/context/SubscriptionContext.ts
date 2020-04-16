import { createContext } from 'react'

interface Context {
  subscriptionList: any[]
  subscriptionTotal: number
}

export default createContext<Context>({ subscriptionList: [], subscriptionTotal: 0 })
