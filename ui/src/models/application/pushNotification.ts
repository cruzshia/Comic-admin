export enum PushNotificationKeys {
  Id = 'id',
  Status = 'status',
  Title = 'title',
  NotificationMessage = 'notification_message',
  AppId = 'app_id',
  DeepLinkUrl = 'deep_link_url',
  LargeIconUrl = 'large_icon_url',
  DeliveryDateTime = 'run_at',
  SendCount = 'sent_count',
  Message = 'message'
}
export enum SearchKeys {
  NotificationMessage = 'notification_message',
  AppId = 'app_id',
  DeliveryStartDateTime = 'run_at_from',
  DeliveryEndDateTime = 'run_at_to'
}

export interface SearchParam {
  [SearchKeys.NotificationMessage]?: string
  [SearchKeys.AppId]?: string
  [SearchKeys.DeliveryStartDateTime]?: string
  [SearchKeys.DeliveryEndDateTime]?: string
}
export enum PushNotificationStatus {
  Wait = 'wait',
  Running = 'running',
  Success = 'success',
  Failure = 'failure'
}
interface PushNotification {
  [PushNotificationKeys.Id]: number
  [PushNotificationKeys.Status]: PushNotificationStatus
  [PushNotificationKeys.Title]: string
  [PushNotificationKeys.NotificationMessage]: string
  [PushNotificationKeys.AppId]: string
  [PushNotificationKeys.DeepLinkUrl]: string
  [PushNotificationKeys.LargeIconUrl]: string
  [PushNotificationKeys.DeliveryDateTime]: string
  [PushNotificationKeys.SendCount]: number | null
  [PushNotificationKeys.Message]: string
}

export interface ListResponse {
  push_notifications: PushNotification[]
  total_count: number
}

export default PushNotification
