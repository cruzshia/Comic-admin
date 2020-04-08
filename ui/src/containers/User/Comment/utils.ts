import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const COMMENT_BREADCRUMBS = [
  { title: commonMessages.userManagement },
  { title: messages.commentList, route: routePath.user.comment }
]
export enum ListTableProp {
  CreateDateTime = 'createDateTime',
  UserId = 'userId',
  Content = 'content',
  Message = 'message',
  Likes = 'likes',
  Report = 'report',
  Status = 'status'
}
