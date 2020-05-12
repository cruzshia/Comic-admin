import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { routePath } from '@src/common/appConfig'
import { getCSVLogListAction } from '@src/reducers/user/giftComics/giftComicsAction'
import GiftComicsContext, { ActionContext } from './context/GiftComicsContext'
import GiftComicsCreation from './components/GiftComicsCreation'
import GiftComicsBatchLogs from './components/GiftComicsBatchLogs'

export default function GiftComics() {
  const dispatch = useDispatch()
  const { csvLogList, csvLogTotal } = useSelector((state: StoreState) => state.giftComics)

  const handleGetCsvLogList = useCallback(() => dispatch(getCSVLogListAction()), [dispatch])

  return (
    <ActionContext.Provider value={{ onGetCsvLogList: handleGetCsvLogList }}>
      <GiftComicsContext.Provider value={{ csvLogList: csvLogList, csvLogTotal }}>
        <Switch>
          <Route exact path={routePath.user.giftComicsCreation} component={GiftComicsCreation}></Route>
          <Route exact path={routePath.user.giftComicsBatchLogs} component={GiftComicsBatchLogs}></Route>
        </Switch>
      </GiftComicsContext.Provider>
    </ActionContext.Provider>
  )
}
