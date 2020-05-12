import { createContext } from 'react'
import Content from '@src/models/comics/content'

interface ContentContext {
  contentList: any[]
  currentContent?: any
  totalContent: number
}

export default createContext<ContentContext>({
  contentList: [],
  totalContent: 0
})

interface ActionContext {
  onGetContentList: () => void
  onGetContent: (contentId: string) => void
  onCreateContent: (content: Content) => void
  onUpdateContent: (content: Content) => void
  onResetContent: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetContentList: () => {},
  onGetContent: () => {},
  onCreateContent: () => {},
  onUpdateContent: () => {},
  onResetContent: () => {}
})
