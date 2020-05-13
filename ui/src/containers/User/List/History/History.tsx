import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getHistoryEpisodeListAction,
  getHistoryEpisodeAction,
  resetHistoryEpisodeAction
} from '@src/reducers/user/user/historyEpisodeActions'
import {
  getHistorySubscriptionListAction,
  getHistorySubscriptionAction,
  resetHistorySubscriptionAction
} from '@src/reducers/user/user/historySubscriptionActions'
import {
  getHistoryBonusCoinAction,
  getHistoryBonusCoinListAction,
  resetHistoryBonusCoinAction
} from '@src/reducers/user/user/historyBonusCoinActions'
import { getHistoryMagazineListAction } from '@src/reducers/user/user/historyMagazineActions'
import HistoryEpisodeList from './components/HistoryEpisodeList'
import HistoryEpisodeDetail from './components/HistoryEpisodeDetail'
import HistorySubscriptionList from './components/HistorySubscriptionList'
import HistorySubscriptionDetail from './components/HistorySubscriptionDetail'
import HistoryMagazineList from './components/HistoryMagazineList'
import HistoryMagazineDetail from './components/HistoryMagazineDetail'
import HistoryBonusCoinList from './components/HistoryBonusCoinList'
import HistoryBonusCoinDetail from './components/HistoryBonusCoinDetail'
import HistoryPayCoinList from './components/HistoryPayCoinList'
import HistoryPayCoinDetail from './components/HistoryPayCoinDetail'
import { mockMagazineDetail } from './mockData/magazineMockData'
import { mockPayCoinList, mockPayCoinDetail } from './mockData/payCoinMockData'

export default function History() {
  const dispatch = useDispatch()
  const {
    historyEpisode: { historyEpisodeList, currentHistoryEpisode, historyEpisodeTotal },
    historySubscription: { historySubscriptionList, historySubscriptionTotal, currentHistorySubscription },
    historyMagazine: { historyMagazineList, historyMagazineTotal },
    historyBonusCoin: { historyBonusCoinList, historyBonusCoinTotal, currentHistoryBonusCoin }
  } = useSelector((state: StoreState) => ({
    historyEpisode: state.historyEpisode,
    historySubscription: state.historySubscription,
    historyMagazine: state.historyMagazine,
    historyBonusCoin: state.historyBonusCoin
  }))
  const handleGetHistoryListEpisode = useCallback(() => dispatch(getHistoryEpisodeListAction()), [dispatch])
  const handleGetHistoryEpisode = useCallback((id: string) => dispatch(getHistoryEpisodeAction(id)), [dispatch])
  const handleResetHistoryEpisode = useCallback(() => dispatch(resetHistoryEpisodeAction()), [dispatch])
  const handleGetHistorySubscriptionList = useCallback(() => dispatch(getHistorySubscriptionListAction()), [dispatch])
  const handleGetHistorySubscription = useCallback((id: string) => dispatch(getHistorySubscriptionAction(id)), [
    dispatch
  ])
  const handleResetHistorySubscription = useCallback(() => dispatch(resetHistorySubscriptionAction()), [dispatch])
  const handleGetHistoryMagazineList = useCallback(() => dispatch(getHistoryMagazineListAction()), [dispatch])
  const handleGetHistoryBonusCoinList = useCallback(() => dispatch(getHistoryBonusCoinListAction()), [dispatch])
  const handleGetHistoryBonusCoin = useCallback((id: string) => dispatch(getHistoryBonusCoinAction(id)), [dispatch])
  const handleResetHistoryBonusCoin = useCallback(() => dispatch(resetHistoryBonusCoinAction()), [dispatch])

  return (
    <Switch>
      <Route
        exact
        path={routePath.user.historyEpisode}
        render={() => (
          <HistoryEpisodeList
            onGetHistoryEpisode={handleGetHistoryListEpisode}
            historyTotal={historyEpisodeTotal}
            historyList={historyEpisodeList}
          />
        )}
      />
      <Route
        exact
        path={routePath.user.historyEpisodeDetail}
        render={() => (
          <HistoryEpisodeDetail
            onGetEpisodeHistory={handleGetHistoryEpisode}
            onResetHistoryEpisode={handleResetHistoryEpisode}
            currentHistory={currentHistoryEpisode}
          />
        )}
      />
      <Route
        exact
        path={routePath.user.historySubscription}
        render={() => (
          <HistorySubscriptionList
            onGetList={handleGetHistorySubscriptionList}
            historyTotal={historySubscriptionTotal}
            historyList={historySubscriptionList}
          />
        )}
      />
      <Route
        exact
        path={routePath.user.historySubscriptionDetail}
        render={() => (
          <HistorySubscriptionDetail
            onGetSubscription={handleGetHistorySubscription}
            onResetSubscription={handleResetHistorySubscription}
            currentSubscription={currentHistorySubscription}
          />
        )}
      />
      <Route
        exact
        path={routePath.user.historyMagazine}
        render={() => (
          <HistoryMagazineList
            onGetMagazineList={handleGetHistoryMagazineList}
            historyTotal={historyMagazineTotal}
            historyList={historyMagazineList}
          />
        )}
      />
      <Route
        exact
        path={routePath.user.historyMagazineDetail}
        render={() => <HistoryMagazineDetail currentHistory={mockMagazineDetail} />}
      />
      <Route
        exact
        path={routePath.user.historyBonusCoin}
        render={() => (
          <HistoryBonusCoinList
            onGetHistoryBonusCoin={handleGetHistoryBonusCoinList}
            historyTotal={historyBonusCoinTotal}
            historyList={historyBonusCoinList}
          />
        )}
      />
      <Route
        exact
        path={routePath.user.historyBonusCoinDetail}
        render={() => (
          <HistoryBonusCoinDetail
            currentHistory={currentHistoryBonusCoin}
            onGetHistoryBonusCoin={handleGetHistoryBonusCoin}
            onResetHistoryBonusCoin={handleResetHistoryBonusCoin}
          />
        )}
      />
      <Route
        exact
        path={routePath.user.historyPayCoin}
        render={() => <HistoryPayCoinList historyTotal={mockPayCoinList.length} historyList={mockPayCoinList} />}
      />
      <Route
        exact
        path={routePath.user.historyPayCoinDetail}
        render={() => <HistoryPayCoinDetail currentHistory={mockPayCoinDetail} />}
      />
    </Switch>
  )
}
