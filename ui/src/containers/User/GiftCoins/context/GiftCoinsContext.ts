import { createContext } from 'react'
import { GiftCoinsCsvLog } from '@src/models/user/giftCoins'
interface GiftCoinsContext {
  csvLogList: GiftCoinsCsvLog[]
  csvLogTotal: number
}

export default createContext<GiftCoinsContext>({
  csvLogList: [],
  csvLogTotal: 0
})

interface ActionContext {
  onGetCsvLogList: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetCsvLogList: () => {}
})
