import { createContext } from 'react'
import Author from '@src/models/comics/author'

interface AuthorContext {
  authorList: any[]
  authorTotal: number
  currentAuthor?: any
}

export default createContext<AuthorContext>({
  authorList: [],
  authorTotal: 0
})

interface ActionContext {
  onGetAuthorList: () => void
  onGetAuthor: (authorId: string) => void
  onResetAuthor: () => void
  onCreateAuthor: (author: Author) => void
  onUpdateAuthor: (author: Author) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetAuthorList: () => {},
  onGetAuthor: () => {},
  onResetAuthor: () => {},
  onCreateAuthor: () => {},
  onUpdateAuthor: () => {}
})
