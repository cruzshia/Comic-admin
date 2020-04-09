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
