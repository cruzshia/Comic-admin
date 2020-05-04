import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.campaign }
]