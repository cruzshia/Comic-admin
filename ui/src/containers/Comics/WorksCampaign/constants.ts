import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import messages from './messages'

export const WORKS_CAMPAIGN_BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.comicsWorksCampaign, route: routePath.comics.worksCampaign }
]
