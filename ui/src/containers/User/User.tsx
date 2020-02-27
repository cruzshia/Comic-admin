import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import UserList from './List/UserList'
import AccountCodeList from './AccountCode/AccountCodeList'
import NGWord from './NGWord/NGWordList'
import ContentGiftList from './ContentGift/ContentGiftList'
import CoinGiftList from './CoinGift/CoinGiftList'

export default function User() {
  return (
    <Switch>
      <Route exact path={routePath.user.list} component={UserList} />
      <Route exact path={routePath.user.accountCode} component={AccountCodeList} />
      <Route exact path={routePath.user.ngWord} component={NGWord} />
      <Route exact path={routePath.user.contentGift} component={ContentGiftList} />
      <Route exact path={routePath.user.coinGift} component={CoinGiftList} />
    </Switch>
  )
}
