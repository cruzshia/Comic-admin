import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import { SearchParam, CoinProductSearchKeys } from '@src/models/application/coinProduct'
import { validDateTime } from '@src/utils/validation'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.applicationManagement },
  { title: messages.list, route: routePath.application.coinProduct }
]

export function searchParamsValidator(values: Partial<SearchParam>) {
  const publishBeginAt = values[CoinProductSearchKeys.PublishBeginAt]

  return { [CoinProductSearchKeys.PublishBeginAt]: publishBeginAt && validDateTime(publishBeginAt) }
}
