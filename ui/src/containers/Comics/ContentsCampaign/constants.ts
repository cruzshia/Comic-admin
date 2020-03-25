import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const CONTENTSCAMPAIGN_BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.management, route: routePath.comics.contentsCampaign }
]
