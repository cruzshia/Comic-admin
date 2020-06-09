import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { StoreState } from '@src/reducers'
import { routePath } from '@src/common/appConfig'
import {
  createSubscriptionProductAction,
  getSubscriptionProductAction,
  resetSubscriptionProductAction,
  deleteSubscriptionProductAction,
  updateSubscriptionProductAction
} from '@src/reducers/comics/subscription/subscriptionProductAction'
import { SubscriptionProduct as SubscriptionProductModel } from '@src/models/comics/subscription'
import SubscriptionProductCreation from './components/SubscriptionProductCreation'
import SubscriptionProductDetail from './components/SubscriptionProductDetail'
import SubscriptionProductContext, { ActionContext } from './context/SubscriptionProductContext'
import SubscriptionProductEdit from './components/SubscriptionProductEdit'

export default function SubscriptionProduct() {
  const { currentSubscriptionProduct } = useSelector((state: StoreState) => state.subscriptionProduct)

  const dispatch = useDispatch()

  const handleCreateSubscriptionProduct = useCallback(
    (data: SubscriptionProductModel) => dispatch(createSubscriptionProductAction(data)),
    [dispatch]
  )
  const handleGetSubscriptionProduct = useCallback((id: string) => dispatch(getSubscriptionProductAction(id)), [
    dispatch
  ])
  const handleResetSubscriptionProduct = useCallback(() => dispatch(resetSubscriptionProductAction()), [dispatch])
  const handleDeleteSubscriptionProduct = useCallback((id: string) => dispatch(deleteSubscriptionProductAction(id)), [
    dispatch
  ])
  const handleUpdateSubscriptionProduct = useCallback((id: string) => dispatch(updateSubscriptionProductAction(id)), [
    dispatch
  ])

  return (
    <ActionContext.Provider
      value={{
        onCreateSubscriptionProduct: handleCreateSubscriptionProduct,
        onGetSubscriptionProduct: handleGetSubscriptionProduct,
        onResetSubscriptionProduct: handleResetSubscriptionProduct,
        onDeleteSubscriptionProduct: handleDeleteSubscriptionProduct,
        onUpdateSubscriptionProduct: handleUpdateSubscriptionProduct
      }}
    >
      <SubscriptionProductContext.Provider value={{ currentSubscriptionProduct }}>
        <Switch>
          <Route exact path={routePath.comics.subscriptionProductCreation} component={SubscriptionProductCreation} />
          <Route exact path={routePath.comics.subscriptionProductDetail} component={SubscriptionProductDetail} />
          <Route exact path={routePath.comics.subscriptionProductEdit} component={SubscriptionProductEdit} />
        </Switch>
      </SubscriptionProductContext.Provider>
    </ActionContext.Provider>
  )
}
