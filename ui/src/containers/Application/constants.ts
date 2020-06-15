import { PushNotificationStatus } from '@src/models/application/pushNotification'
export enum Status {
  opened = 'opened',
  closed = 'closed',
  reserved = 'reserved'
}
export const capsuleStatusMap = {
  [PushNotificationStatus.Success]: Status.opened,
  [PushNotificationStatus.Wait]: Status.reserved,
  [PushNotificationStatus.Running]: Status.reserved,
  [PushNotificationStatus.Failure]: Status.closed
}
