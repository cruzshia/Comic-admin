import { createContext } from 'react'
import { CoinDeliveryEvent, CoinEventDetail } from '@src/models/application/coinDeliveryEvent'

interface CoinDeliveryEventContext {
  eventList: any[]
  currentEvent?: CoinEventDetail
  eventTotal: number
}

export default createContext<CoinDeliveryEventContext>({
  eventList: [],
  eventTotal: 0
})

interface CoinDeliveryEventActionContext {
  onGetCoinDeliveryEventList: (params?: object) => void
  onGetCoinDeliveryEvent: (_: string) => void
  onCreateCoinDeliveryEvent: (_: CoinDeliveryEvent) => void
  onUpdateCoinDeliveryEvent: (_: CoinDeliveryEvent) => void
  onResetCoinDeliveryEvent: () => void
}

export const ActionContext = createContext<CoinDeliveryEventActionContext>({
  onGetCoinDeliveryEventList: () => {},
  onGetCoinDeliveryEvent: (_: string) => {},
  onCreateCoinDeliveryEvent: (_: CoinDeliveryEvent) => {},
  onUpdateCoinDeliveryEvent: (_: CoinDeliveryEvent) => {},
  onResetCoinDeliveryEvent: () => {}
})
