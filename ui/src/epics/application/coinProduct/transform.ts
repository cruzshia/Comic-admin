import { CoinProductDetail, CoinProductKeys } from '@src/models/application/coinProduct'
import { batchConvertISO8601 } from '@src/utils/functions'
import { ListParams } from '@src/reducers/application/coinProduct/coinProductActions'

export const toListModel = (list: ListParams): ListParams => {
  const coinProducts = list.coin_products.map(coinProduct => toCoinProductModel(coinProduct))

  return { ...list, coin_products: coinProducts }
}

export const toCoinProductModel = (coinProduct: CoinProductDetail): CoinProductDetail => {
  coinProduct = batchConvertISO8601<CoinProductDetail>(coinProduct, [
    CoinProductKeys.PublishBeginAt,
    CoinProductKeys.PublishEndAt,
    CoinProductKeys.InsertedAt,
    CoinProductKeys.UpdatedAt
  ])

  return coinProduct
}
