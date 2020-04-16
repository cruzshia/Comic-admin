import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import WorksCampaign from './WorksCampaign/WorksCampaign'
import Work from './Work/Work'
import Content from './Content/Content'
import Author from './Author/Author'
import ContentsCampaign from './ContentsCampaign/ContentsCampaign'
import Subscription from './Subscription/Subscription'

export default function Comics() {
  return (
    <Switch>
      <Route path={routePath.comics.work} component={Work} />
      <Route path={routePath.comics.content} component={Content} />
      <Route path={routePath.comics.worksCampaign} component={WorksCampaign} />
      <Route path={routePath.comics.contentsCampaign} component={ContentsCampaign} />
      <Route path={routePath.comics.author} component={Author} />
      <Route path={routePath.comics.subscription} component={Subscription} />
    </Switch>
  )
}
