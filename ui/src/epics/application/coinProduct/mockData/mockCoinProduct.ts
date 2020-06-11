import { CoinProductKeys, CoinProductStatusType } from '@src/models/application/coinProduct'
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
  [CoinProductKeys.Id]: `WORK_SHUNKAN10000006${num}`,
  [CoinProductKeys.ProductIdToken]: `WORK_SHUNKAN10000006${num}`,
  [CoinProductKeys.AppId]: `WORK_SHUNKAN10000006${num}`,
  [CoinProductKeys.PayCoin]: 100 + num,
  [CoinProductKeys.PayBonusCoin]: 100 - num,
  [CoinProductKeys.Status]: CoinProductStatusType.Active,
  [CoinProductKeys.PublishBeginAt]: `2020-04-02 14:0${num}:00Z`,
  [CoinProductKeys.PublishEndAt]: `2020-04-02 14:0${num}:00Z`,
  [CoinProductKeys.InsertedAt]: `2020-04-02 14:0${num}:00Z`,
  [CoinProductKeys.UpdatedAt]: `2020-04-02 14:00${num}:00Z`
}))
