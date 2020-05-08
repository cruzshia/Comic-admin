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

interface ActionContext {
  onGetCommentList: () => void
  onGetComment: (id: string) => void
  onUpdateComment: (data: UserComment) => void
  onDeleteComment: (idList: string[]) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetCommentList: () => {},
  onGetComment: (_: string) => {},
  onUpdateComment: (_: UserComment) => {},
  onDeleteComment: (_: string[]) => {}
})
