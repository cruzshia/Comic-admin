import { routePath } from '@src/common/appConfig'
import commonMessages from '@src/messages'
import { SearchParam, CoinProductSearchKeys, CoinProduct, CoinProductKeys } from '@src/models/application/coinProduct'
import { validDateTime, required, validNaturalNumber, composeValidators } from '@src/utils/validation'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.applicationManagement },
  { title: messages.list, route: routePath.application.coinProduct }
]

export function searchParamsValidator(values: Partial<SearchParam>) {
  const publishBeginAt = values[CoinProductSearchKeys.PublishBeginAt]

  return { [CoinProductSearchKeys.PublishBeginAt]: publishBeginAt && validDateTime(publishBeginAt) }
}

export function validateCoinProduct(values: Partial<CoinProduct>) {
  return {
    [CoinProductKeys.AppId]: required(values[CoinProductKeys.AppId]),
    [CoinProductKeys.PayCoin]: composeValidators(required, validNaturalNumber)(values[CoinProductKeys.PayCoin]),
    [CoinProductKeys.PayBonusCoin]: composeValidators(
      required,
      validNaturalNumber
    )(values[CoinProductKeys.PayBonusCoin]),
    [CoinProductKeys.Status]: required(values[CoinProductKeys.Status]),
    [CoinProductKeys.PublishBeginAt]: validDateTime(values[CoinProductKeys.PublishBeginAt] || ''),
    [CoinProductKeys.PublishEndAt]: validDateTime(values[CoinProductKeys.PublishEndAt] || '')
  }
}
