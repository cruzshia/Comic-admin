import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import { createSubscriptionProductAction } from '@src/reducers/comics/subscription/subscriptionProductAction'
import { SubscriptionProduct as SubscriptionProductModel } from '@src/models/comics/subscription'
import SubscriptionProductCreation from './components/SubscriptionProductCreation'
import { ActionContext } from './context/SubscriptionProductContext'

export default function SubscriptionProduct() {
  const dispatch = useDispatch()

  const handleCreateSubscriptionProduct = useCallback(
    (data: SubscriptionProductModel) => dispatch(createSubscriptionProductAction(data)),
    [dispatch]
  )
  return (
    <ActionContext.Provider value={{ onCreateSubscriptionProduct: handleCreateSubscriptionProduct }}>
      <Switch>
        <Route exact path={routePath.comics.subscriptionProductCreation} component={SubscriptionProductCreation} />
      </Switch>
    </ActionContext.Provider>
  )
}
