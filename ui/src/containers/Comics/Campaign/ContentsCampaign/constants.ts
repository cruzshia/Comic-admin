import campaignMessages from '../messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: campaignMessages.list, route: routePath.comics.campaign },
  { title: campaignMessages.detail, route: routePath.comics.campaignDetail }
]
