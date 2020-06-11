import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { CoinProduct } from '@src/models/application/coinProduct'
import { mockCoinProductList, mockCoinProductDetail } from './mockData/mockCoinProduct'
import { objToQueryStr } from '@src/utils/functions'
import { ListParams } from '@src/reducers/application/coinProduct/coinProductActions'
import { Response } from '../../utils'

const COIN_PRODUCT_API_PATH = 'v1/coin_products'

export const getCoinProductListAjax = (params?: Object): Response<ListParams> => {
  authAjax.get(COIN_PRODUCT_API_PATH + (params ? '?' + objToQueryStr(params) : ''))
  return from([
    {
      status: 200,
      response: {
        coin_products: mockCoinProductList,
        total_count: mockCoinProductList.length
      }
    }
  ])
}

export const getCoinProductAjax = (id: string): Observable<{ status: number; response: CoinProduct }> => {
  authAjax.get(`/application/coin_product/${id}`)
  return from([
    {
      status: 200,
      response: mockCoinProductDetail
    }
  ])
}

export const createCoinProductAjax = (data: CoinProduct): Observable<{ status: number; response: CoinProduct }> => {
  authAjax.post('/application/coin_product', data)
  return from([
    {
      status: 200,
      response: mockCoinProductDetail
    }
  ])
}

export const updateCoinProductAjax = (data: CoinProduct): Observable<{ status: number; response: CoinProduct }> => {
  authAjax.put('/application/coin_product', data)
  return from([
    {
      status: 200,
      response: mockCoinProductDetail
    }
  ])
}
