import { _range } from '@src/utils/functions'

const coinDetails = [
  '購入コイン： -100',
  `購入コイン数： -40	
購入お得コイン数： -30
贈答用購入コイン数：-30`,
  '贈答用購入コイン数： -100',
  '購入コイン： -100',
  '購入お得コイン数： -100',
  '購入コイン： -100'
]

export const mockMagazineList = _range(0, 6).map(num => ({
  id: num,
  createdAt: `2020-01-21 16:3${num}`,
  contents: `WORK_SHUNKAN1000000${num}`,
  applicationId: '少年ジャンプ+ for iOS',
  coinChangeTotal: -100,
  coinChangeDetail: coinDetails[num]
}))

export const mockMagazineDetail = {
  createdAt: '2020-04-02 14:00',
  updatedAt: '2020-04-02 14:00',
  userId: 'WORK_SHUNKAN10000006',
  contentsId: 'WORK_SHUNKAN10000006',
  subscriptionId: 'WORK_SHUNKAN10000006',
  applicationId: '少年ジャンプ+ for iOS',
  paidCoinCount: 100,
  paidGivenCoinCount: 100,
  paidGiftCoinCount: 700,
  supplementInfo: 'サンプルテキスト',
  price: 900,
  currency: 'JPY',
  startAt: '2020-04-02 14:00',
  validityPeriod: '2020-04-02 14:00'
}
