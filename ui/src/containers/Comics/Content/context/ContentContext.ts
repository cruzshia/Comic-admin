import { createContext } from 'react'

interface ContentContext {
  contentList: any[]
  currentContent?: any
}

export default createContext<ContentContext>({
  contentList: []
})
