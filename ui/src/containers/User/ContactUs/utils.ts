import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.userManagement },
  { title: messages.list, route: routePath.user.contactUs }
]
