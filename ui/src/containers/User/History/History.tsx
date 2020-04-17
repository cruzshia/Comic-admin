import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import HistoryEpisodeList from './components/HistoryEpisodeList'
import HistoryEpisodeDetail from './components/HistoryEpisodeDetail'
import HistorySubscriptionList from './components/HistorySubscriptionList'
import HistorySubscriptionDetail from './components/HistorySubscriptionDetail'
import { mockEpisodePurchaseList, mockEpisodePurchaseDetail } from './mockData/episodePurchaseMockData'
import { mockSubscriptionList, mockSubscriptionDetail } from './mockData/subscriptionMockData'

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
    </Switch>
  )
}
