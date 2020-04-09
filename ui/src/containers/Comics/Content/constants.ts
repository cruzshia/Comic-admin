import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const CONTENT_BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.management, route: routePath.comics.content }
]

export const MAGAZINE_BANNER_NUM = 3
