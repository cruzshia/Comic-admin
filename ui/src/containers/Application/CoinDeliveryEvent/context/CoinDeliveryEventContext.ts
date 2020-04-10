import { createContext } from 'react'

interface CoinDeliveryEventContext {
  eventList: any[]
  currentEvent?: any
  eventTotal: number
}

export default createContext<CoinDeliveryEventContext>({
  eventList: [],
  eventTotal: 0
})
