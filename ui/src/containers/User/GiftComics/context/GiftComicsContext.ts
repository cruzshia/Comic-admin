import { createContext } from 'react'
import { GiftComicsCsvLog } from '@src/models/user/giftComics'

export interface GiftComicsContext {
  csvLogList: GiftComicsCsvLog[]
  csvLogTotal: number
}

export default createContext<GiftComicsContext>({
  csvLogList: [],
  csvLogTotal: 0
})

interface ActionContext {
  onGetCsvLogList: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetCsvLogList: () => {}
})
