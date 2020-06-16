import PushNotification, { PushNotificationKeys } from '@src/models/application/pushNotification'
import { toISO8601, batchConvertISO8601 } from '@src/utils/functions'

export const toEditableNotification = (data: PushNotification) =>
  batchConvertISO8601(data, [PushNotificationKeys.DeliveryDateTime])

export const toRequestNotification = (data: Partial<PushNotification>): Partial<PushNotification> => ({
  [PushNotificationKeys.Id]: data[PushNotificationKeys.Id],
  [PushNotificationKeys.Title]: data[PushNotificationKeys.Title],
  [PushNotificationKeys.NotificationMessage]: data[PushNotificationKeys.NotificationMessage],
  [PushNotificationKeys.AppId]: data[PushNotificationKeys.AppId],
  [PushNotificationKeys.DeepLinkUrl]: data[PushNotificationKeys.DeepLinkUrl],
  [PushNotificationKeys.LargeIconUrl]: data[PushNotificationKeys.LargeIconUrl],
  [PushNotificationKeys.DeliveryDateTime]: toISO8601(data[PushNotificationKeys.DeliveryDateTime]!)
})
