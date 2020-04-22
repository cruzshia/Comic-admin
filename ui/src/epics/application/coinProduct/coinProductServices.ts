import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { CoinProduct } from '@src/models/application/coinProduct'
import { mockCoinProductList } from './mockData/mockCoinProduct'

export const getCoinProductListAjax = (): Observable<{ status: number; response: CoinProduct[] }> => {
  authAjax.get('/application/coin_product/list')
  return from([
    {
      status: 200,
      response: mockCoinProductList
    }
  ])
}
