import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import HistoryEpisodeList from './components/HistoryEpisodeList'
import HistoryEpisodeDetail from './components/HistoryEpisodeDetail'

export default function History() {
  return (
    <Switch>
      <Route exact path={routePath.user.historyEpisode} component={HistoryEpisodeList} />
      <Route exact path={routePath.user.historyEpisodeDetail} component={HistoryEpisodeDetail} />
    </Switch>
  )
}
