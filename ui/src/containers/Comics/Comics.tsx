import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import WorksCampaign from './WorksCampaign/WorksCampaign'
import Work from './Work/Work'
import Content from './Content/Content'
import AuthorList from './Author/AuthorList'
import ContentsCampaignList from './ContentsCampaign/ContentsCampaignList'

export default function Comics() {
  return (
    <Switch>
      <Route path={routePath.comics.work} component={Work} />
      <Route path={routePath.comics.content} component={Content} />
      <Route path={routePath.comics.worksCampaign} component={WorksCampaign} />
      <Route exact path={routePath.comics.contentsCampaign} component={ContentsCampaignList} />
      <Route exact path={routePath.comics.author} component={AuthorList} />
    </Switch>
  )
}
