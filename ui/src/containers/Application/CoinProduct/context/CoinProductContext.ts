import { createContext } from 'react'
import { CoinProduct, CoinProductDetail } from '@src/models/application/coinProduct'

interface CoinProductContext {
  productList: CoinProductDetail[]
  currentProduct?: any
  productTotal: number
}

export default createContext<CoinProductContext>({
  productList: [],
  productTotal: 0
})
interface CoinProductActionContext {
  onGetCoinProductList: (params?: Object) => void
  onGetCoinProduct: (_: string) => void
  onCreateCoinProduct: (_: CoinProduct) => void
  onUpdateCoinProduct: (_: CoinProduct) => void
  onResetCoinProduct: () => void
}

export const ActionContext = createContext<CoinProductActionContext>({
  onGetCoinProductList: () => {},
  onGetCoinProduct: (_: string) => {},
  onCreateCoinProduct: (_: CoinProduct) => {},
  onUpdateCoinProduct: (_: CoinProduct) => {},
  onResetCoinProduct: () => {}
})
