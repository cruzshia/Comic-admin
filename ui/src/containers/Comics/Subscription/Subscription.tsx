import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import SubscriptionCreation from './components/SubscriptionCreation'
import SubscriptionEdit from './components/SubscriptionEdit'
import SubscriptionDetail from './components/SubscriptionDetail'
import SubscriptionList from './components/SubscriptionList'
import SubscriptionContext, { ActionContext } from './context/SubscriptionContext'
import { StoreState } from '@src/reducers'
import { getSubscriptionListAction, getSubscriptionAction } from '@src/reducers/comics/subscription/subscriptionAction'
import { mockSubscriptionDetail } from './mockData/mockData'

export default function Subscription() {
  const { subscriptionList, subscriptionTotal } = useSelector((state: StoreState) => state.subscription)
  const dispatch = useDispatch()
  const handleGetSubscriptionList = useCallback(() => dispatch(getSubscriptionListAction()), [dispatch])
  const handleGetSubscription = useCallback((id: string) => dispatch(getSubscriptionAction(id)), [dispatch])

  return (
    <ActionContext.Provider
      value={{ onGetSubscription: handleGetSubscription, onGetSubscriptionList: handleGetSubscriptionList }}
    >
      <SubscriptionContext.Provider
        value={{
          subscriptionList,
          subscriptionTotal,
          currentSubscription: mockSubscriptionDetail
        }}
      >
        <Switch>
          <Route exact path={routePath.comics.subscriptionCreation} component={SubscriptionCreation} />
          <Route exact path={routePath.comics.subscriptionEdit} component={SubscriptionEdit} />
          <Route exact path={routePath.comics.subscriptionDetail} component={SubscriptionDetail} />
          <Route exact path={routePath.comics.subscription} component={SubscriptionList} />
        </Switch>
      </SubscriptionContext.Provider>
    </ActionContext.Provider>
  )
}
