import { routePath } from '@src/common/appConfig'
import {
  required,
  composeValidators,
  isValidLength,
  CHARACTER_LIMIT,
  validDateTime,
  isGreaterThanNow,
  isValidDuration
} from '@src/utils/validation'
import PushNotification, {
  PushNotificationKeys,
  SearchParam,
  SearchKeys
} from '@src/models/application/pushNotification'
import commonMessages from '@src/messages'
import messages from './messages'

export const BREADCRUMBS = [
  { title: commonMessages.applicationManagement },
  { title: messages.list, route: routePath.application.pushNotification }
]

const generalTextValidate = composeValidators(required, isValidLength(CHARACTER_LIMIT))

export function validateNotification(values: Partial<PushNotification>) {
  return {
    [PushNotificationKeys.Title]: generalTextValidate(values[PushNotificationKeys.Title]),
    [PushNotificationKeys.NotificationMessage]: generalTextValidate(values[PushNotificationKeys.NotificationMessage]),
    [PushNotificationKeys.AppId]: generalTextValidate(values[PushNotificationKeys.AppId]),
    [PushNotificationKeys.DeepLinkUrl]: generalTextValidate(values[PushNotificationKeys.DeepLinkUrl]),
    [PushNotificationKeys.LargeIconUrl]: generalTextValidate(values[PushNotificationKeys.LargeIconUrl]),
    [PushNotificationKeys.DeliveryDateTime]: composeValidators(
      required,
      validDateTime,
      isGreaterThanNow
    )(values[PushNotificationKeys.DeliveryDateTime])
  }
}

export function searchParamsValidator({
  [SearchKeys.DeliveryStartDateTime]: startDate,
  [SearchKeys.DeliveryEndDateTime]: endDate
}: Partial<SearchParam>) {
  return {
    [SearchKeys.DeliveryStartDateTime]: startDate && validDateTime(startDate),
    [SearchKeys.DeliveryEndDateTime]:
      (endDate && validDateTime(endDate)) || (startDate && endDate && isValidDuration(startDate, endDate))
  }
}
