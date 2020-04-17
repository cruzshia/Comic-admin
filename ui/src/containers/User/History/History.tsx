import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import HistoryEpisodeList from './components/HistoryEpisodeList'
import HistoryEpisodeDetail from './components/HistoryEpisodeDetail'
import HistorySubscriptionList from './components/HistorySubscriptionList'
import HistorySubscriptionDetail from './components/HistorySubscriptionDetail'
import HistoryMagazineList from './components/HistoryMagazineList'
import HistoryMagazineDetail from './components/HistoryMagazineDetail'
import { mockEpisodePurchaseList, mockEpisodePurchaseDetail } from './mockData/episodePurchaseMockData'
import { mockSubscriptionList, mockSubscriptionDetail } from './mockData/subscriptionMockData'
import { mockMagazineList, mockMagazineDetail } from './mockData/magazineMockData'

export default function History() {
  return (
    <Switch>
      <Route
        exact
        path={routePath.user.historyEpisode}
        render={() => (
          <HistoryEpisodeList historyTotal={mockEpisodePurchaseList.length} historyList={mockEpisodePurchaseList} />
        )}
      />
      <Route
        exact
        path={routePath.user.historyEpisodeDetail}
        render={() => <HistoryEpisodeDetail currentHistory={mockEpisodePurchaseDetail} />}
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
    </Switch>
  )
}
