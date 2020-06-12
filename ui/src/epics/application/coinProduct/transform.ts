import { CoinProduct, CoinProductKeys } from '@src/models/application/coinProduct'
import { batchConvertISO8601, batchConvertDate } from '@src/utils/functions'

export const toCoinProductModel = (coinProduct: CoinProduct): CoinProduct => {
  coinProduct = batchConvertISO8601<CoinProduct>(coinProduct, [
    CoinProductKeys.PublishBeginAt,
    CoinProductKeys.PublishEndAt,
    CoinProductKeys.InsertedAt,
    CoinProductKeys.UpdatedAt
  ])

  return coinProduct
}

export const toRequestCoinProduct = (coinProduct: CoinProduct): CoinProduct => {
  const convertedCoinProduct = batchConvertDate<CoinProduct>(coinProduct, [
    CoinProductKeys.PublishBeginAt,
    CoinProductKeys.PublishEndAt
  ])

  return convertedCoinProduct
}
