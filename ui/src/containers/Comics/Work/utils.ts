import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import Work, { WorkSearchKeys, SearchParam, WorkKeys } from '@src/models/comics/work'
import { validDateTime, isValidDuration, required } from '@src/utils/validation'
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

const dateFormatError = 'Wrong format'
export function searchParamsValidator(values: Partial<SearchParam>) {
  const [publishStartFrom, publishStartTo, publishEndFrom, publishEndTo] = [
    values[WorkSearchKeys.PublishBeginAtFrom],
    values[WorkSearchKeys.PublishBeginAtTo],
    values[WorkSearchKeys.PublishEndAtFrom],
    values[WorkSearchKeys.PublishEndAtTo]
  ]

  return {
    [WorkSearchKeys.PublishBeginAtFrom]:
      publishStartFrom && !validDateTime(publishStartFrom) ? dateFormatError : undefined,
    [WorkSearchKeys.PublishBeginAtTo]:
      publishStartTo &&
      (!validDateTime(publishStartTo) || (publishStartFrom && !isValidDuration(publishStartFrom, publishStartTo)))
        ? dateFormatError
        : undefined,
    [WorkSearchKeys.PublishEndAtFrom]: publishEndFrom && !validDateTime(publishEndFrom) ? dateFormatError : undefined,
    [WorkSearchKeys.PublishEndAtTo]:
      publishEndTo &&
      (!validDateTime(publishEndTo) || (publishEndFrom && !isValidDuration(publishEndFrom, publishEndTo)))
        ? dateFormatError
        : undefined
  }
}

export function validateWork(values: Partial<Work>) {
  return {
    [WorkKeys.Title]: required(values[WorkKeys.Title]),
    [WorkKeys.TitleKana]: required(values[WorkKeys.TitleKana]),
    [WorkKeys.PublishBeginAt]: !validDateTime(values[WorkKeys.PublishBeginAt] || '') ? dateFormatError : undefined,
    [WorkKeys.PublishEndAt]: !validDateTime(values[WorkKeys.PublishEndAt] || '') ? dateFormatError : undefined
  }
}
