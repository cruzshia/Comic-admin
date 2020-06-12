import { from } from 'rxjs'
import authAjax from '@src/utils/ajaxUtil'
import { CoinProduct, CoinProductRequestBody, CoinProductKeys } from '@src/models/application/coinProduct'
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

export const getCoinProductAjax = (id: string): Response<CoinProduct> => {
  authAjax.get(`${COIN_PRODUCT_API_PATH}/${id}`)
  return from([
    {
      status: 200,
      response: mockCoinProductDetail
    }
  ])
}

export const createCoinProductAjax = (data: CoinProductRequestBody): Response<CoinProduct> => {
  authAjax.post(COIN_PRODUCT_API_PATH, data)
  return from([
    {
      status: 200,
      response: mockCoinProductDetail
    }
  ])
}

export const updateCoinProductAjax = (data: CoinProduct): Response<CoinProduct> => {
  authAjax.put(`${COIN_PRODUCT_API_PATH}/${data[CoinProductKeys.Id]}`, data)
  return from([
    {
      status: 200,
      response: mockCoinProductDetail
    }
  ])
}
