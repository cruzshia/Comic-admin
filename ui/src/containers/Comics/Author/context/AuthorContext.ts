import { createContext } from 'react'

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
}

export const ActionContext = createContext<ActionContext>({
  onGetAuthorList: () => {},
  onGetAuthor: (_: string) => {},
  onResetAuthor: () => {}
})
