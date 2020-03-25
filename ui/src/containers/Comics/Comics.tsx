import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import WorksCampaign from './WorksCampaign/WorksCampaign'
import Work from './Work/Work'
import Content from './Content/Content'
import AuthorList from './Author/AuthorList'
import ContentsCampaign from './ContentsCampaign/ContentsCampaign'

export default function Comics() {
  return (
    <Switch>
      <Route path={routePath.comics.work} component={Work} />
      <Route path={routePath.comics.content} component={Content} />
      <Route path={routePath.comics.worksCampaign} component={WorksCampaign} />
      <Route path={routePath.comics.contentsCampaign} component={ContentsCampaign} />
      <Route exact path={routePath.comics.author} component={AuthorList} />
    </Switch>
  )
}
