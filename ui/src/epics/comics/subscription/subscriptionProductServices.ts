import { from, Observable } from 'rxjs'
import { ProductListParams } from '@src/reducers/comics/subscription/subscriptionProductAction'
import authAjax from '@src/utils/ajaxUtil'
import { SubscriptionProduct } from '@src/models/comics/subscription'
import { mockSubscriptionProductList, mockSubscriptionProductDetail } from './mockData/mockData'

export const getSubscriptionProductListAjax = (
  subscriptionId: string
): Observable<{ status: number; response: ProductListParams }> => {
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
): Observable<{ status: number; response: SubscriptionProduct }> => {
  authAjax.post('/subscription', subscriptionProduct)
  return from([
    {
      status: 200,
      response: mockSubscriptionProductDetail
    }
  ])
}
