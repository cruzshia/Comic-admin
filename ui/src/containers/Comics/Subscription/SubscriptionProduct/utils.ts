import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import subscriptionMessages from '../messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: subscriptionMessages.list, route: routePath.comics.subscription },
  { title: subscriptionMessages.subscriptionDetail, route: routePath.comics.subscriptionDetail }
]
