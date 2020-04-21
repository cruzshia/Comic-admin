import { createContext } from 'react'

interface Context {
  episodeHistoryList: any[]
  episodeHistoryCount: number
}

export default createContext<Context>({
  episodeHistoryList: [],
  episodeHistoryCount: 0
})
