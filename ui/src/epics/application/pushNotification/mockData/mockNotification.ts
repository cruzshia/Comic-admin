import { _range } from '@src/utils/functions'
import PushNotification, {
  PushNotificationKeys,
  PushNotificationStatus
} from '@src/models/application/pushNotification'

export const mockNotification = (id = 1): PushNotification => ({
  [PushNotificationKeys.Id]: id,
  [PushNotificationKeys.Status]: PushNotificationStatus.Success,
  [PushNotificationKeys.Title]: 'タイトル',
  [PushNotificationKeys.NotificationMessage]: '2020年新年ログインボーナスログインボー',
  [PushNotificationKeys.AppId]: 'SHJP01',
  [PushNotificationKeys.DeepLinkUrl]: 'http://raise-server.atl.access-company.com/',
  [PushNotificationKeys.LargeIconUrl]: 'http://raise-server.atl.access-company.com/',
  [PushNotificationKeys.DeliveryDateTime]: '2020-04-02T14:00:00Z',
  [PushNotificationKeys.SendCount]: 1000,
  [PushNotificationKeys.Message]: ''
})

export const mockNotificationList: PushNotification[] = _range(1, 7).map(idx => ({
  ...mockNotification(),
  [PushNotificationKeys.Status]: idx < 4 ? PushNotificationStatus.Wait : PushNotificationStatus.Failure,
  [PushNotificationKeys.Id]: idx,
  [PushNotificationKeys.DeliveryDateTime]: `2020-04-02T14:0${idx}:00Z`,
  [PushNotificationKeys.Message]: idx === 2 ? '情報の取得に失敗しました' : ''
}))
