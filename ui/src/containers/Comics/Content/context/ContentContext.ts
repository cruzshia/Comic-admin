import { createContext } from 'react'
import Content from '@src/models/comics/content'
import ImportLog from '@src/models/importLog'

interface ContentContext {
  contentList: Content[]
  currentContent?: Content
  totalContent: number
  importLogList: ImportLog[]
  logTotal: number
}

export default createContext<ContentContext>({
  contentList: [],
  totalContent: 0,
  importLogList: [],
  logTotal: 0
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
