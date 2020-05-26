import { _range } from '@src/utils/functions'

export const mockNotification = {
  id: '0',
  title: 'タイトル',
  status: 'reserved',
  message: '2020年新年ログインボーナスログインボー',
  applicationId: 'SHJP01',
  timesPushed: 1000,
  scheduledStartTime: `2019-12-20 00:00`,
  detail: '',
  deepLinkUrl: 'http://raise-server.atl.access-company.com/',
  bigIconUrl: 'http://raise-server.atl.access-company.com/'
}

export const mockNotificationList = _range(1, 7).map(idx => ({
  status: idx < 3 ? 'reserved' : 'closed',
  id: `${idx}`,
  message: '2020年新年ログインボーナス',
  applicationId: 'SHJP01',
  timesPushed: 1000,
  scheduledStartTime: `2019-12-2${idx} 00:0${idx}`,
  detail: idx === 1 ? '情報の取得に失敗しました' : ''
}))
