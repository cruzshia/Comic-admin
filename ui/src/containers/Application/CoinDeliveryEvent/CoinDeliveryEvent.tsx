import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import CoinDeliveryEventList from './components/CoinDeliveryEventList'
import CoinDeliveryEventEdit from './components/CoinDeliveryEventEdit'
import CoinDeliveryEventDetail from './components/CoinDeliveryEventDetail'
import CoinDeliveryEventCreation from './components/CoinDeliveryEventCreation'
import CoinDeliveryEventContext from './context/CoinDeliveryEventContext'
import { mockEventDetail, mockEventList } from './mockData/mockCoinDeliveryEvent'

export default function CoinDeliveryEvent() {
  return (
    <Switch>
      <CoinDeliveryEventContext.Provider
        value={{ eventList: mockEventList, eventTotal: mockEventList.length, currentEvent: mockEventDetail }}
      >
        <Route exact path={routePath.application.coinDeliveryEvent} component={CoinDeliveryEventList} />
        <Route exact path={routePath.application.coinDeliveryEventEdit} component={CoinDeliveryEventEdit} />
        <Route exact path={routePath.application.coinDeliveryEventCreation} component={CoinDeliveryEventCreation} />
        <Route exact path={routePath.application.coinDeliveryEventDetail} component={CoinDeliveryEventDetail} />
      </CoinDeliveryEventContext.Provider>
    </Switch>
  )
}
