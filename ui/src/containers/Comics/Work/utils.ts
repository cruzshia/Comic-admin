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
  INVALID_FORMAT,
  CHARACTER_LIMIT,
  TEXT_LIMIT
} from '@src/utils/validation'
import { toISO8601 } from '@src/utils/functions'

export const BREADCRUMBS = [
  { title: commonMessages.comicsManagement },
  { title: messages.list, route: routePath.comics.work }
]

export function convertDateFormat(params: Partial<SearchParam> = {}) {
  const [convertedParams, dateKeys] = [
    { ...params },
    [
      WorkSearchKeys.PublishBeginAtFrom,
      WorkSearchKeys.PublishBeginAtTo,
      WorkSearchKeys.PublishEndAtFrom,
      WorkSearchKeys.PublishEndAtTo
    ]
  ]
  dateKeys.forEach(dateKey => {
    if (!!convertedParams[dateKey]) {
      convertedParams[dateKey] = toISO8601(convertedParams[dateKey])
    }
  })
  return convertedParams
}

export function searchParamsValidator(values: Partial<SearchParam>) {
  const [publishStartFrom, publishStartTo, publishEndFrom, publishEndTo] = [
    values[WorkSearchKeys.PublishBeginAtFrom],
    values[WorkSearchKeys.PublishBeginAtTo],
    values[WorkSearchKeys.PublishEndAtFrom],
    values[WorkSearchKeys.PublishEndAtTo]
  ]

  return {
    [WorkSearchKeys.PublishBeginAtFrom]:
      publishStartFrom && !validDateTime(publishStartFrom) ? INVALID_FORMAT : undefined,
    [WorkSearchKeys.PublishBeginAtTo]:
      publishStartTo &&
      (!validDateTime(publishStartTo) || (publishStartFrom && !isValidDuration(publishStartFrom, publishStartTo)))
        ? INVALID_FORMAT
        : undefined,
    [WorkSearchKeys.PublishEndAtFrom]: publishEndFrom && !validDateTime(publishEndFrom) ? INVALID_FORMAT : undefined,
    [WorkSearchKeys.PublishEndAtTo]:
      publishEndTo &&
      (!validDateTime(publishEndTo) || (publishEndFrom && !isValidDuration(publishEndFrom, publishEndTo)))
        ? INVALID_FORMAT
        : undefined
  }
}

export function validateWork(values: Partial<Work>) {
  const isEpisodeType = values[WorkKeys.WorkType] === WorkType.Episode

  return {
    [WorkKeys.WorkType]: required(values[WorkKeys.WorkType]),
    [WorkKeys.Title]: required(values[WorkKeys.Title]) || isValidLength(CHARACTER_LIMIT, values[WorkKeys.Title]!),
    [WorkKeys.TitleKana]:
      required(values[WorkKeys.TitleKana]) || isValidLength(CHARACTER_LIMIT, values[WorkKeys.TitleKana]!),
    [WorkKeys.Description]:
      required(values[WorkKeys.Description]) || isValidLength(TEXT_LIMIT, values[WorkKeys.Description]!),
    [WorkKeys.AppId]: required(values[WorkKeys.AppId]),
    [WorkKeys.PublishBeginAt]: !validDateTime(values[WorkKeys.PublishBeginAt] || '') ? INVALID_FORMAT : undefined,
    [WorkKeys.PublishEndAt]: !validDateTime(values[WorkKeys.PublishEndAt] || '') ? INVALID_FORMAT : undefined,
    [WorkKeys.ReturnAdRevenue]: required(values[WorkKeys.ReturnAdRevenue]),

    ...(isEpisodeType
      ? {
          [WorkKeys.EpisodeWorkType]: required(values[WorkKeys.EpisodeWorkType]),
          [WorkKeys.UpdateFrequency]:
            required(values[WorkKeys.UpdateFrequency]) ||
            isValidLength(CHARACTER_LIMIT, values[WorkKeys.UpdateFrequency]!),
          [WorkKeys.MagazineName]:
            required(values[WorkKeys.MagazineName]) || isValidLength(CHARACTER_LIMIT, values[WorkKeys.MagazineName]!),
          [WorkKeys.FreePeriodicalDay]:
            required(values[WorkKeys.FreePeriodicalDay]) ||
            isValidLength(CHARACTER_LIMIT, values[WorkKeys.FreePeriodicalDay]!),
          [WorkKeys.AdSetting]: validateAd(values[WorkKeys.AdSetting]!)
        }
      : {})
  }
}
