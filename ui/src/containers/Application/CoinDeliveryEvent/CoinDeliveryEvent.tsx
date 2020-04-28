import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import { getCoinDeliveryEventListAction } from '@src/reducers/application/coinDeliveryEvent/coinDeliveryEventActions'
import CoinDeliveryEventList from './components/CoinDeliveryEventList'
import CoinDeliveryEventEdit from './components/CoinDeliveryEventEdit'
import CoinDeliveryEventDetail from './components/CoinDeliveryEventDetail'
import CoinDeliveryEventCreation from './components/CoinDeliveryEventCreation'
import CoinDeliveryEventContext, { ActionContext } from './context/CoinDeliveryEventContext'
import { mockEventDetail } from './mockData/mockCoinDeliveryEvent'

export default function CoinDeliveryEvent() {
  const dispatch = useDispatch()
  const { eventList, eventTotal } = useSelector((store: StoreState) => store.coinDeliveryEvent)
  const handleGetList = useCallback(() => dispatch(getCoinDeliveryEventListAction()), [dispatch])
  return (
    <Switch>
      <ActionContext.Provider value={{ onGetCoinDeliveryEventList: handleGetList }}>
        <CoinDeliveryEventContext.Provider value={{ eventList, eventTotal, currentEvent: mockEventDetail }}>
          <Route exact path={routePath.application.coinDeliveryEvent} component={CoinDeliveryEventList} />
          <Route exact path={routePath.application.coinDeliveryEventEdit} component={CoinDeliveryEventEdit} />
          <Route exact path={routePath.application.coinDeliveryEventCreation} component={CoinDeliveryEventCreation} />
          <Route exact path={routePath.application.coinDeliveryEventDetail} component={CoinDeliveryEventDetail} />
        </CoinDeliveryEventContext.Provider>
      </ActionContext.Provider>
    </Switch>
  )
}
