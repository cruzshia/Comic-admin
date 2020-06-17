import { routePath } from '@src/common/appConfig'
import {
  validDateTime,
  isValidDuration,
  composeValidators,
  isValidLength,
  CHARACTER_LIMIT,
  required,
  validKana,
  validPositiveInteger,
  DESCRIPTION_LIMIT,
  URL_LIMIT
} from '@src/utils/validation'
import { WorkType } from '@src/models/comics/work'
import { AdSetting } from '@src/models/comics/advertisement'
import commonMessages from '@src/messages'
import { validateAd } from '../components/Advertisement'
import messages from './messages'

export const CONTENT_BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.content }
]

export const MAGAZINE_BANNER_NUM = 3

export function searchParamsValidator(values: any) {
  const { deliverStartStart, deliverStartEnd, deliverEndStart, deliverEndEnd } = values
  return {
    deliverStartStart: deliverStartStart && validDateTime(deliverStartStart),
    deliverStartEnd:
      deliverStartEnd &&
      (validDateTime(deliverStartEnd) || (deliverStartStart && isValidDuration(deliverStartStart, deliverStartEnd))),
    deliverEndStart: deliverEndStart && validDateTime(deliverEndStart),
    deliverEndEnd:
      deliverEndEnd &&
      (validDateTime(deliverEndEnd) || (deliverEndStart && isValidDuration(deliverEndStart, deliverEndEnd)))
  }
}

export function validateContent(values: any) {
  const {
    title,
    titleKana,
    category,
    description,
    price,
    openingAdUrl,
    sort,
    episodeNumber,
    deliverStartStart,
    deliverStartEnd,
    paidCoinDeliverStart,
    paidCoinDeliverEnd,
    freePPVStart1,
    freePPVEnd1,
    freePPVStart2,
    freePPVEnd2,
    adSetting,
    magazineAdSetting
  } = values

  const isEpisodeType = category === WorkType.Episode
  const isMagazineType = category === WorkType.Magazine

  return {
    title: composeValidators(required, isValidLength(CHARACTER_LIMIT))(title),
    titleKana: composeValidators(required, validKana)(titleKana),
    category: required(category),
    description: isValidLength(DESCRIPTION_LIMIT)(description),
    price: validPositiveInteger(price),
    openingAdUrl: isValidLength(URL_LIMIT)(openingAdUrl),
    sort: validPositiveInteger(sort) && sort > 0,
    episodeNumber: validPositiveInteger(episodeNumber),
    deliverStartStart: validDateTime(deliverStartStart),
    deliverStartEnd:
      validDateTime(deliverStartEnd) || (deliverStartStart && isValidDuration(deliverStartStart, deliverStartEnd)),
    paidCoinDeliverStart: paidCoinDeliverEnd && validDateTime(paidCoinDeliverStart),
    paidCoinDeliverEnd: paidCoinDeliverStart && isValidDuration(paidCoinDeliverStart, paidCoinDeliverEnd),
    freePPVStart1: freePPVEnd1 && validDateTime(freePPVStart1),
    freePPVEnd1: freePPVStart1 && isValidDuration(freePPVStart1, freePPVEnd1),
    freePPVStart2: freePPVEnd2 && validDateTime(freePPVStart2),
    freePPVEnd2: freePPVStart2 && isValidDuration(freePPVStart2, freePPVEnd1),
    adSetting: isEpisodeType && adSetting?.map((setting: AdSetting) => validateAd(setting)),
    magazineAdSetting: isMagazineType && magazineAdSetting?.map((setting: AdSetting) => validateAd(setting))
  }
}
