import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import HistoryEpisodeList from './components/HistoryEpisodeList'
import HistoryEpisodeDetail from './components/HistoryEpisodeDetail'
import { mockEpisodePurchaseList, mockEposodePurchaseDetail } from './mockData/episodePuchaseMockData'

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
        render={() => <HistoryEpisodeDetail currentHistory={mockEposodePurchaseDetail} />}
      />
    </Switch>
  )
}
