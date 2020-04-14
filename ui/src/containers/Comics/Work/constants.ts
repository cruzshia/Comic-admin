import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.work }
]
