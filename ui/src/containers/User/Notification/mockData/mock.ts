import { _range } from '@src/utils/functions'

export const mockNotificationList = _range(0, 7).map(idx => ({
  createDateTime: `2019/12/25 00:0${idx}`,
  title: '3/8はエビス＆ガマ丸の誕生日！',
  id: 'WORK_SHUNKAN10000006',
  application: '少年ジャンプ+ for iOS',
  releaseStartDate: `2019/12/25 00:0${idx}`,
  releaseEndDate: '2019/12/25 00:00'
}))
