import { createContext } from 'react'

interface CommentContext {
  commentList: any[]
  currentComment?: any
  commentTotal: number
}

export default createContext<CommentContext>({
  commentList: [],
  commentTotal: 0
})
