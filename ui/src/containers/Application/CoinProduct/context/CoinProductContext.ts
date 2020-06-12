import { CoinProduct, CoinProductRequestBody } from '@src/models/application/coinProduct'
import { createContext } from 'react'

interface CoinProductContext {
  productList: CoinProduct[]
  currentProduct?: CoinProduct
  productTotal: number
}

export default createContext<CoinProductContext>({
  productList: [],
  productTotal: 0
})
interface CoinProductActionContext {
  onGetCoinProductList: (params?: Object) => void
  onGetCoinProduct: (_: string) => void
  onCreateCoinProduct: (_: CoinProductRequestBody) => void
  onUpdateCoinProduct: (_: CoinProductRequestBody) => void
  onResetCoinProduct: () => void
}

export const ActionContext = createContext<CoinProductActionContext>({
  onGetCoinProductList: () => {},
  onGetCoinProduct: () => {},
  onCreateCoinProduct: () => {},
  onUpdateCoinProduct: () => {},
  onResetCoinProduct: () => {}
})
