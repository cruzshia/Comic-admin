import { from, Observable } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { CoinProduct } from '@src/models/application/coinProduct'
import { mockCoinProductList, mockCoinProductDetail } from './mockData/mockCoinProduct'

export const getCoinProductListAjax = (): Observable<{ status: number; response: CoinProduct[] }> => {
  authAjax.get('/application/coin_product/list')
  return from([
    {
      status: 200,
      response: mockCoinProductList
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
