import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import campaignMessages from '../messages'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: campaignMessages.list, route: routePath.comics.campaign },
  { title: campaignMessages.detail, route: routePath.comics.campaignDetail }
]
