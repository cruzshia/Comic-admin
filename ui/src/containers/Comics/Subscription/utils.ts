import { routePath } from '@src/common/appConfig'
import messages from './messages'
import commonMessages from '@src/messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.subscription }
]
