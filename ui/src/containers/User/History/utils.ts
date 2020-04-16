import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import userMessages from '../messages'

export const BREADCRUMBS = [
  { title: commonMessages.userManagement },
  { title: userMessages.list, route: routePath.user.list },
  { title: userMessages.detail, route: routePath.user.userDetail }
]
