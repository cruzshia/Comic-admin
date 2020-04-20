import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import GiftCoinsCreation from './components/GiftCoinsCreation'
import GiftCoinsBatchLogs from './components/GiftCoinsBatchLogs'

export default function GiftCoins() {
  return (
    <>
      <Switch>
        <Route exact path={routePath.user.giftCoinsCreation} component={GiftCoinsCreation}></Route>
        <Route exact path={routePath.user.giftCoinsBatchLogs} component={GiftCoinsBatchLogs}></Route>
      </Switch>
    </>
  )
}
