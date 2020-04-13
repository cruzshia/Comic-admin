import { _range } from '@src/utils/functions'

export const mockCoinProductDetail = {
  productId: 'WORK_SHUNKAN10000006',
  applicationId: 'WORK_SHUNKAN10000006',
  paidCoin: 'サンプルテキスト',
  givenCoin: 'サンプルテキスト',
  status: 'アクティブ',
  createdAt: '2020-04-02 14:00',
  updatedAt: '2020-04-02 14:00',
  releaseStartTime: '2020-04-02 14:00',
  releaseEndTime: '2020-04-02 14:00'
}

export const mockCoinProductList = _range(0, 7).map(num => ({
  createdAt: `2020-04-02 14:0${num}`,
  releaseStartTime: `2020-04-02 14:0${num}`,
  productId: `WORK_SHUNKAN1000000${num}`,
  applicationId: 'WORK_SHUNKAN10000006',
  paidCoin: 100 + num,
  givenCoin: 100 - num,
  status: 'アクティブ'
}))
