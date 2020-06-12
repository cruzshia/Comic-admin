import { CoinProductKeys, CoinProductStatusType } from '@src/models/application/coinProduct'
import { _range } from '@src/utils/functions'

export const mockCoinProductDetail = {
  [CoinProductKeys.Id]: 'WORK_SHUNKAN10000006',
  [CoinProductKeys.ProductIdToken]: 'WORK_SHUNKAN10000006',
  [CoinProductKeys.AppId]: 'WORK_SHUNKAN10000006',
  [CoinProductKeys.PayCoin]: 5,
  [CoinProductKeys.PayBonusCoin]: 10,
  [CoinProductKeys.Status]: CoinProductStatusType.Active,
  [CoinProductKeys.PublishBeginAt]: '2020-04-02 14:00:00Z',
  [CoinProductKeys.PublishEndAt]: '2020-04-02 14:00:00Z',
  [CoinProductKeys.InsertedAt]: '2020-04-02 14:00:00Z',
  [CoinProductKeys.UpdatedAt]: '2020-04-02 14:00:00Z'
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
  [CoinProductKeys.UpdatedAt]: `2020-04-02 14:0${num}:00Z`
}))
