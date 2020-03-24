import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const IMAGE_NUM = 4
export const IMAGE_MAX_WIDTH = '30%'
export const DATE_TIME_PLACEHOLDER = 'YYYY-MM-DD 00:00:00'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.comicsWork, route: routePath.comics.work }
]
