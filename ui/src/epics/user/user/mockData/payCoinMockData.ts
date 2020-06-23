import { _range } from '@src/utils/functions'

const coinDetails = [
  `購入コイン数： ＋500\n購入お得コイン数： ＋20`,
  `購入コイン数： ＋1000\n購入お得コイン数： ＋40`,
  '贈答用購入コイン数： ＋5000',
  '贈答用購入コイン数： ＋5000',
  '贈答用購入コイン数： ＋5000',
  '贈答用購入コイン数： ＋5000'
]

const coinTotal = ['+520', '+1040', '+5000', '+5000', '+5000', '+5000']

export const mockPayCoinList = _range(0, 6).map(num => ({
  id: num,
  createdAt: `2020-01-21 16:3${num}`,
  logType: num < 2 ? '購入' : '運営による贈答',
  applicationId: '少年ジャンプ+ for iOS',
  coinChangeTotal: coinTotal[num],
  coinChangeDetail: coinDetails[num]
}))

export const mockPayCoinDetail = {
  createdAt: '2020-04-02 14:00',
  updatedAt: '2020-04-02 14:00',
  userId: 'WORK_SHUNKAN10000006',
  logType: '購入',
  application: '少年ジャンプ+ for iOS',
  payCoinCount: 500,
  payBonusCoinCount: 10,
  payGiftCoinCount: 0,
  supplementInfo: 'サンプルテキスト'
}
