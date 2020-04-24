import { createContext } from 'react'
import UserComment from '@src/models/user/comment'

interface CommentContext {
  commentList: any[]
  currentComment?: any
  commentTotal: number
}

export default createContext<CommentContext>({
  commentList: [],
  commentTotal: 0
})

interface ActionProvider {
  onGetCommentList: () => void
  onGetComment: (id: string) => void
  onUpdateComment: (data: UserComment) => void
}

export const ActionContext = createContext({
  onGetCommentList: () => {},
  onGetComment: (_: string) => {},
  onUpdateComment: (_: UserComment) => {}
})
