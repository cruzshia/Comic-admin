import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'

export const IMAGE_NUM = 7
export const IMAGE_MAX_WIDTH = '40%'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.comicsWork, route: routePath.comics.work }
]
