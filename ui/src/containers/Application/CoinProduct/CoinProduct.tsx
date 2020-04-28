import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getCoinProductListAction,
  createCoinProductAction,
  getCoinProductAction,
  updateCoinProductAction,
  resetCoinProductAction
} from '@src/reducers/application/coinProduct/coinProductActions'
import CoinProductList from './components/CoinProductList'
import CoinProductEdit from './components/CoinProductEdit'
import CoinProductDetail from './components/CoinProductDetail'
import CoinProductCreation from './components/CoinProductCreation'
import CoinProductContext, { ActionContext } from './context/CoinProductContext'

export default function CoinProduct() {
  const dispatch = useDispatch()
  const { productList, currentProduct, productTotal } = useSelector((store: StoreState) => store.coinProduct)
  const handleGetList = useCallback(() => dispatch(getCoinProductListAction()), [dispatch])
  const handleCreate = useCallback(data => dispatch(createCoinProductAction(data)), [dispatch])
  const handleGet = useCallback(id => dispatch(getCoinProductAction(id)), [dispatch])
  const handleUpdate = useCallback(data => dispatch(updateCoinProductAction(data)), [dispatch])
  const handleReset = useCallback(() => dispatch(resetCoinProductAction()), [dispatch])

  return (
    <Switch>
      <ActionContext.Provider
        value={{
          onGetCoinProductList: handleGetList,
          onCreateCoinProduct: handleCreate,
          onGetCoinProduct: handleGet,
          onUpdateCoinProduct: handleUpdate,
          onResetCoinProduct: handleReset
        }}
      >
        <CoinProductContext.Provider
          value={{
            productList,
            productTotal,
            currentProduct
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
