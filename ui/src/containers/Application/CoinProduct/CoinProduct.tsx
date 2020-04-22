import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { getCoinProductListAction } from '@src/reducers/application/coinProduct/coinProductActions'
import { StoreState } from '@src/reducers'
import CoinProductList from './components/CoinProductList'
import CoinProductEdit from './components/CoinProductEdit'
import CoinProductDetail from './components/CoinProductDetail'
import CoinProductCreation from './components/CoinProductCreation'
import CoinProductContext, { ActionContext } from './context/CoinProductContext'
import { mockCoinProductDetail } from '@src/epics/application/coinProduct/mockData/mockCoinProduct'

export default function CoinProduct() {
  const dispatch = useDispatch()
  const { productList } = useSelector((store: StoreState) => store.coinProduct)
  const handleGetList = useCallback(() => {
    dispatch(getCoinProductListAction())
  }, [dispatch])
  return (
    <Switch>
      <ActionContext.Provider value={{ onGetCoinProductList: handleGetList }}>
        <CoinProductContext.Provider
          value={{
            productList: productList,
            productTotal: productList.length,
            currentProduct: mockCoinProductDetail
          }}
        >
          <Route exact path={routePath.application.coinProduct} component={CoinProductList} />
          <Route exact path={routePath.application.coinProductEdit} component={CoinProductEdit} />
          <Route exact path={routePath.application.coinProductCreation} component={CoinProductCreation} />
          <Route exact path={routePath.application.coinProductDetail} component={CoinProductDetail} />
        </CoinProductContext.Provider>
      </ActionContext.Provider>
    </Switch>
  )
}
