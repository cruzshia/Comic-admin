import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import SubscriptionCreation from './components/SubscriptionCreation'
import SubscriptionEdit from './components/SubscriptionEdit'
import SubscriptionDetail from './components/SubscriptionDetail'
import SubscriptionList from './components/SubscriptionList'
import SubscriptionContext from './context/SubscriptionContext'
import { mockSubscriptionList } from './mockData/mockData'

export default function Content() {
  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionList: mockSubscriptionList,
        subscriptionTotal: mockSubscriptionList.length
      }}
    >
      <Switch>
        <Route exact path={routePath.comics.subscriptionCreation} component={SubscriptionCreation} />
        <Route exact path={routePath.comics.subscriptionEdit} component={SubscriptionEdit} />
        <Route exact path={routePath.comics.subscriptionDetail} component={SubscriptionDetail} />
        <Route exact path={routePath.comics.subscription} component={SubscriptionList} />
      </Switch>
    </SubscriptionContext.Provider>
  )
}
