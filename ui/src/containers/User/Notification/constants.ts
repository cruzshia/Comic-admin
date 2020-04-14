import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import message from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.userManagement },
  { title: message.notificationList, route: routePath.user.notification }
]
