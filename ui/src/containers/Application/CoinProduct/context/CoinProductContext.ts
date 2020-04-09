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
