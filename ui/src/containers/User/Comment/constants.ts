import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const COMMENT_BREADCRUMBS = [
  { title: commonMessages.userManagement },
  { title: messages.commentList, route: routePath.user.comment }
]
