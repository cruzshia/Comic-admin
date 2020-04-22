import { createContext } from 'react'

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
}

export const ActionContext = createContext<CoinProductActionContext>({
  onGetCoinProductList: () => {}
})
