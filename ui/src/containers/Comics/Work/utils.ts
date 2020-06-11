import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import Work, { WorkSearchKeys, SearchParam, WorkKeys, WorkType } from '@src/models/comics/work'
import { validateAd } from '../components/Advertisement'
import {
  validDateTime,
  isValidDuration,
  required,
  isValidLength,
  composeValidators,
  CHARACTER_LIMIT,
  TEXT_LIMIT
} from '@src/utils/validation'
import { batchConvertDate } from '@src/utils/functions'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.work }
]

export function convertDateFormat(params: Partial<SearchParam> = {}) {
  return batchConvertDate(params, [
    WorkSearchKeys.PublishBeginAtFrom,
    WorkSearchKeys.PublishBeginAtTo,
    WorkSearchKeys.PublishEndAtFrom,
    WorkSearchKeys.PublishEndAtTo
  ])
}

export function searchParamsValidator(values: Partial<SearchParam>) {
  const [publishStartFrom, publishStartTo, publishEndFrom, publishEndTo] = [
    values[WorkSearchKeys.PublishBeginAtFrom],
    values[WorkSearchKeys.PublishBeginAtTo],
    values[WorkSearchKeys.PublishEndAtFrom],
    values[WorkSearchKeys.PublishEndAtTo]
  ]

  return {
    [WorkSearchKeys.PublishBeginAtFrom]: publishStartFrom && validDateTime(publishStartFrom),
    [WorkSearchKeys.PublishBeginAtTo]:
      publishStartTo &&
      (validDateTime(publishStartTo) || (publishStartFrom && isValidDuration(publishStartFrom, publishStartTo))),
    [WorkSearchKeys.PublishEndAtFrom]: publishEndFrom && validDateTime(publishEndFrom),
    [WorkSearchKeys.PublishEndAtTo]:
      publishEndTo && (validDateTime(publishEndTo) || (publishEndFrom && isValidDuration(publishEndFrom, publishEndTo)))
  }
}

export function validateWork(values: Partial<Work>) {
  const isEpisodeType = values[WorkKeys.WorkType] === WorkType.Episode

  return {
    [WorkKeys.WorkType]: required(values[WorkKeys.WorkType]),
    [WorkKeys.Title]: composeValidators(required, isValidLength(CHARACTER_LIMIT))(values[WorkKeys.Title]),
    [WorkKeys.TitleKana]: composeValidators(required, isValidLength(CHARACTER_LIMIT))(values[WorkKeys.TitleKana]!),
    [WorkKeys.Description]: composeValidators(required, isValidLength(TEXT_LIMIT))(values[WorkKeys.Description]!),
    [WorkKeys.AppId]: required(values[WorkKeys.AppId]),
    [WorkKeys.PublishBeginAt]: validDateTime(values[WorkKeys.PublishBeginAt] || ''),
    [WorkKeys.PublishEndAt]: validDateTime(values[WorkKeys.PublishEndAt] || ''),
    [WorkKeys.ReturnAdRevenue]: required(values[WorkKeys.ReturnAdRevenue]),

    ...(isEpisodeType
      ? {
          [WorkKeys.EpisodeWorkType]: required(values[WorkKeys.EpisodeWorkType]),
          [WorkKeys.UpdateFrequency]: composeValidators(
            required,
            isValidLength(CHARACTER_LIMIT)
          )(values[WorkKeys.UpdateFrequency]!),

          [WorkKeys.MagazineName]: composeValidators(
            required,
            isValidLength(CHARACTER_LIMIT)
          )(values[WorkKeys.MagazineName]!),

          [WorkKeys.FreePeriodicalDay]: composeValidators(
            required,
            isValidLength(CHARACTER_LIMIT)
          )(values[WorkKeys.FreePeriodicalDay]!),

          [WorkKeys.AdSetting]: values[WorkKeys.AdSetting]?.map(setting => validateAd(setting))
        }
      : {})
  }
}