import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import { getCSVLogListAction } from '@src/reducers/user/giftCoins/giftCoinsAction'
import GiftCoinsContext, { ActionContext } from './context/GiftCoinsContext'
import GiftCoinsCreation from './components/GiftCoinsCreation'
import GiftCoinsImportLogs from './components/GiftCoinsImportLogs'

export default function GiftCoins() {
  const dispatch = useDispatch()
  const { csvLogList, csvLogTotal } = useSelector((state: StoreState) => state.giftCoins)
  const handleGetCsvLogList = useCallback(() => dispatch(getCSVLogListAction()), [dispatch])

  return (
    <ActionContext.Provider value={{ onGetCsvLogList: handleGetCsvLogList }}>
      <GiftCoinsContext.Provider value={{ csvLogList, csvLogTotal }}>
        <Switch>
          <Route exact path={routePath.user.giftCoinsCreation} component={GiftCoinsCreation}></Route>
          <Route exact path={routePath.user.giftCoinsBatchLogs} component={GiftCoinsImportLogs}></Route>
        </Switch>
      </GiftCoinsContext.Provider>
    </ActionContext.Provider>
  )
}
