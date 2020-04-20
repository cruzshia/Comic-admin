import { _range } from '@src/utils/functions'

const logType = [
  'コンテンツの完読による報酬',
  'コイン付与イベントによる報酬',
  '運営による贈答',
  'コンテンツの完読による報酬',
  'コイン付与イベントによる報酬',
  '運営による贈答',
  'コンテンツの完読による報酬'
]

export const mockBonusCoinList = _range(0, 7).map(num => ({
  id: num,
  createdAt: `2020-01-21 16:3${num}`,
  logType: logType[num],
  applicationId: '少年ジャンプ+ for iOS',
  campaignDetail: 'WORK_SHUNKAN10000006',
  coinChangeTotal: '+100',
  coinChangeDetail: 'ボーナスコイン数： ＋100'
}))

export const mockBonusCoinDetail = {
  createdAt: '2020-04-02 14:00',
  updatedAt: '2020-04-02 14:00',
  userId: 'WORK_SHUNKAN10000006',
  contentsCampaignId: '',
  customEventId: 'WORK_SHUNKAN10000006',
  customEventPaymentId: 'WORK_SHUNKAN10000006',
  logType: 'Jコンテンツの完読による報酬',
  applicationId: '少年ジャンプ+ for iOS',
  bonusCoinCount: 10,
  adCoinCount: 10,
  videoAdCoinCount: 10
}
