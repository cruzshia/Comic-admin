import { _range } from '@src/utils/functions'

export const mockNotificationList = _range(0, 7).map(idx => ({
  createDateTime: `2019/12/25 00:0${idx}`,
  title: '3/8はエビス＆ガマ丸の誕生日！',
  id: 'WORK_SHUNKAN10000006',
  application: '少年ジャンプ+ for iOS',
  releaseStartDate: `2019/12/25 00:0${idx}`,
  releaseEndDate: '2019/12/25 00:00'
}))

export const mockNotification = {
  id: 'WORK_SHUNKAN10000006',
  application: '少年ジャンプ+ for iOS',
  createDateTime: '2019-12-25 00:00',
  updateDateTime: '2019-12-25 00:00',
  publicStartTime: '2019-12-25 00:00',
  publicEndTime: '2019-12-25 00:00',
  notificationType: 'お知らせカテゴリ',
  majorFlag: '重要なイベント',
  title: '3/8はエビス＆ガマ丸の誕生日！',
  text: `<html>
<head>
<meta charset="utf-8">
<title>タイトル</title>
</head>
<body>
本文
</body>
</html>`
}
