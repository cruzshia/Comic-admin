import { from, Observable } from 'rxjs'
import { ProductListParams } from '@src/reducers/comics/subscription/subscriptionProductAction'
import authAjax from '@src/utils/ajaxUtil'
import { SubscriptionProduct } from '@src/models/comics/subscription'
import { mockSubscriptionProductList, mockSubscriptionProductDetail } from './mockData/mockData'
import { Response } from '../../utils'

export const getSubscriptionProductListAjax = (subscriptionId: string): Response<ProductListParams> => {
  authAjax.get('/subscription/list' + subscriptionId)
  return from([
    {
      status: 200,
      response: {
        products: mockSubscriptionProductList,
        total: mockSubscriptionProductList.length
      }
    }
  ])
}

export const createSubscriptionProductAjax = (
  subscriptionProduct: SubscriptionProduct
): Response<SubscriptionProduct> => {
  authAjax.post('/subscription', subscriptionProduct)
  return from([
    {
      status: 200,
      response: mockSubscriptionProductDetail
    }
  ])
}

export const getSubscriptionProductAjax = (id: string): Response<SubscriptionProduct> => {
  authAjax.get('/subscription/product' + id)
  return from([
    {
      status: 200,
      response: mockSubscriptionProductDetail(id)
    }
  ])
}

export const deleteSubscriptionProductAjax = (id: string): Observable<{ status: number }> => {
  authAjax.delete('/subscription/product/delete' + id)
  return from([
    {
      status: 200
    }
  ])
}

export const updateSubscriptionProductAjax = (
  subscriptionProduct: SubscriptionProduct
): Response<SubscriptionProduct> => {
  authAjax.post('/subscription', subscriptionProduct)
  return from([
    {
      status: 200,
      response: mockSubscriptionProductDetail
    }
  ])
}
