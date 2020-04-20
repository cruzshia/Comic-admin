import commonMessages from '@src/messages'
import messages from './messages'
import { routePath } from '@src/common/appConfig'

export const BREADCRUMBS = [
  { title: commonMessages.userManagement },
  { title: messages.csvBatchGift, route: routePath.user.giftCoins }
]
