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
import { mockSubscriptionList, mockSubscriptionDetail } from './mockData/subscriptionMockData'
import { mockMagazineList, mockMagazineDetail } from './mockData/magazineMockData'
import { mockBonusCoinList, mockBonusCoinDetail } from './mockData/bonusCoinMockData'
import { mockPayCoinList, mockPayCoinDetail } from './mockData/payCoinMockData'

export default function History() {
  const dispatch = useDispatch()
  const { historyEpisodeList, currentHistoryEpisode, historyEpisodeTotal } = useSelector(
    (state: StoreState) => state.historyEpisode
  )
  const handleGetHistoryListEpisode = useCallback(() => dispatch(getHistoryEpisodeListAction()), [dispatch])
  const handleGetHistoryEpisode = useCallback((id: string) => dispatch(getHistoryEpisodeAction(id)), [dispatch])
  const handleResetHistoryEpisode = useCallback(() => dispatch(resetHistoryEpisodeAction()), [dispatch])

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
          <HistorySubscriptionList historyTotal={mockSubscriptionList.length} historyList={mockSubscriptionList} />
        )}
      />
      <Route
        exact
        path={routePath.user.historySubscriptionDetail}
        render={() => <HistorySubscriptionDetail currentHistory={mockSubscriptionDetail} />}
      />
      <Route
        exact
        path={routePath.user.historyMagazine}
        render={() => <HistoryMagazineList historyTotal={mockMagazineList.length} historyList={mockMagazineList} />}
      />
      <Route
        exact
        path={routePath.user.historyMagazineDetail}
        render={() => <HistoryMagazineDetail currentHistory={mockMagazineDetail} />}
      />
      <Route
        exact
        path={routePath.user.historyBonusCoin}
        render={() => <HistoryBonusCoinList historyTotal={mockBonusCoinList.length} historyList={mockBonusCoinList} />}
      />
      <Route
        exact
        path={routePath.user.historyBonusCoinDetail}
        render={() => <HistoryBonusCoinDetail currentHistory={mockBonusCoinDetail} />}
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
