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

interface CoinDeliveryEventActionContext {
  onGetCoinDeliveryEventList: () => void
}

export const ActionContext = createContext<CoinDeliveryEventActionContext>({
  onGetCoinDeliveryEventList: () => {}
})
