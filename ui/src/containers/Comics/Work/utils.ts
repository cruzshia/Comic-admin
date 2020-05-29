import messages from './messages'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import { WorkSearchKeys, SearchParam } from '@src/models/comics/work'
import { validDateTime, isValidDuration } from '@src/utils/validation'
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
  const dateFormatError = 'Wrong format'
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
