import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.applicationManagement },
  { title: messages.list, route: routePath.application.applicationInfo }
]
