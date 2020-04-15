import { _range } from '@src/utils/functions'

export const mockContactList = _range(0, 5).map(num => ({
  contactAt: `2020-01-21 16:3${num}`,
  id: `WORK_SHUNKAN1000000${num}`,
  type: 'サンプル',
  message: '12月の請求が12月1日と12月31日と2回来ているのはなぜですか？ 定期購読は少年ジャンプしかしていないです。',
  appVersion: '2.6.1'
}))
