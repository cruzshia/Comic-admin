import { createContext } from 'react'
import { CoinProduct } from '@src/models/application/coinProduct'

interface CoinProductContext {
  productList: any[]
  currentProduct?: any
  productTotal: number
}

export default createContext<CoinProductContext>({
  productList: [],
  productTotal: 0
})
interface CoinProductActionContext {
  onGetCoinProductList: () => void
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
