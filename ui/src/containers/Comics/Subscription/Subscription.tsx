import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import SubscriptionCreation from './components/SubscriptionCreation'
import SubscriptionEdit from './components/SubscriptionEdit'
import SubscriptionDetail from './components/SubscriptionDetail'
import SubscriptionList from './components/SubscriptionList'
import SubscriptionContext, { ActionContext } from './context/SubscriptionContext'
import SubscriptionModel from '@src/models/comics/subscription'
import { StoreState } from '@src/reducers'
import {
  getSubscriptionListAction,
  getSubscriptionAction,
  createSubscriptionAction,
  updateSubscriptionAction,
  resetSubscriptionAction
} from '@src/reducers/comics/subscription/subscriptionAction'
import { getSubscriptionProductListAction } from '@src/reducers/comics/subscription/subscriptionProductAction'
import SubscriptionProduct from './SubscriptionProduct/SubscriptionProduct'

export default function Subscription() {
  const { subscriptionList, subscriptionTotal, currentSubscription } = useSelector(
    (state: StoreState) => state.subscription
  )
  const { subscriptionProductList, subscriptionProductTotal } = useSelector(
    (state: StoreState) => state.subscriptionProduct
  )
  const dispatch = useDispatch()
  const handleGetSubscriptionList = useCallback(() => dispatch(getSubscriptionListAction()), [dispatch])
  const handleGetSubscription = useCallback((id: string) => dispatch(getSubscriptionAction(id)), [dispatch])
  const handleResetSubscription = useCallback(() => dispatch(resetSubscriptionAction()), [dispatch])
  const handleCreateSubscription = useCallback((data: SubscriptionModel) => dispatch(createSubscriptionAction(data)), [
    dispatch
  ])
  const handleUpdateSubscription = useCallback((data: SubscriptionModel) => dispatch(updateSubscriptionAction(data)), [
    dispatch
  ])
  const handleGetSubscriptionProductList = useCallback((id: string) => dispatch(getSubscriptionProductListAction(id)), [
    dispatch
  ])

  return (
    <ActionContext.Provider
      value={{
        onGetSubscription: handleGetSubscription,
        onGetSubscriptionList: handleGetSubscriptionList,
        onCreateSubscription: handleCreateSubscription,
        onUpdateSubscription: handleUpdateSubscription,
        onResetSubscription: handleResetSubscription,
        onGetSubscriptionProductList: handleGetSubscriptionProductList
      }}
    >
      <SubscriptionContext.Provider
        value={{
          subscriptionList,
          subscriptionTotal,
          currentSubscription,
          subscriptionProductList,
          subscriptionProductTotal
        }}
      >
        <Switch>
          <Route exact path={routePath.comics.subscriptionCreation} component={SubscriptionCreation} />
          <Route exact path={routePath.comics.subscriptionEdit} component={SubscriptionEdit} />
          <Route exact path={routePath.comics.subscriptionDetail} component={SubscriptionDetail} />
          <Route exact path={routePath.comics.subscription} component={SubscriptionList} />
          <Route path={routePath.comics.subscriptionProduct} component={SubscriptionProduct} />
        </Switch>
      </SubscriptionContext.Provider>
    </ActionContext.Provider>
  )
}
