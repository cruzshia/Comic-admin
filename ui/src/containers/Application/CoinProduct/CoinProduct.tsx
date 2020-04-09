import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import CoinProductList from './components/CoinProductList'
import CoinProductEdit from './components/CoinProductEdit'
import CoinProductDetail from './components/CoinProductDetail'
import CoinProductCreation from './components/CoinProductCreation'
import CoinProductContext from './context/CoinProductContext'

export default function CoinProduct() {
  return (
    <Switch>
      <CoinProductContext.Provider value={{ productList: [], productTotal: 0 }}>
        <Route exact path={routePath.application.coinProduct} component={CoinProductList} />
        <Route exact path={routePath.application.coinProductEdit} component={CoinProductEdit} />
        <Route exact path={routePath.application.coinProductCreation} component={CoinProductCreation} />
        <Route exact path={routePath.application.coinProductDetail} component={CoinProductDetail} />
      </CoinProductContext.Provider>
    </Switch>
  )
}
