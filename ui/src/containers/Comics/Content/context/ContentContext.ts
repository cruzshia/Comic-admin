import { createContext } from 'react'

interface ContentContext {
  contentList: any[]
  currentContent?: any
  totalContent: number
}

export default createContext<ContentContext>({
  contentList: [],
  totalContent: 0
})
