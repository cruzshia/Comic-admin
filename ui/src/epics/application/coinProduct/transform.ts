import { CoinProduct, CoinProductKeys } from '@src/models/application/coinProduct'
import { batchConvertISO8601 } from '@src/utils/functions'

export const toCoinProductModel = (coinProduct: CoinProduct): CoinProduct => {
  coinProduct = batchConvertISO8601<CoinProduct>(coinProduct, [
    CoinProductKeys.PublishBeginAt,
    CoinProductKeys.PublishEndAt,
    CoinProductKeys.InsertedAt,
    CoinProductKeys.UpdatedAt
  ])

  return coinProduct
}
