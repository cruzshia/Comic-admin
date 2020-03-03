import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import WorkList from './Work/WorkList'
import WorkCreation from './Work/WorkCreation'
import WorkEdit from './Work/WorkEdit'
import WorkDetail from './Work/WorkDetail'
import WorksCampaignList from './WorksCampaign/WorksCampaignList'
import ContentList from './Content/ContentList'
import AuthorList from './Author/AuthorList'
import ContentsCampaignList from './ContentsCampaign/ContentsCampaignList'

export default function Comics() {
  return (
    <Switch>
      <Route exact path={routePath.comics.work} component={WorkList} />
      <Route exact path={routePath.comics.workCreation} component={WorkCreation} />
      <Route exact path={routePath.comics.workEdit} component={WorkEdit} />
      <Route exact path={routePath.comics.workDetail} component={WorkDetail} />
      <Route exact path={routePath.comics.content} component={ContentList} />
      <Route exact path={routePath.comics.worksCampaign} component={WorksCampaignList} />
      <Route exact path={routePath.comics.contentsCampaign} component={ContentsCampaignList} />
      <Route exact path={routePath.comics.author} component={AuthorList} />
    </Switch>
  )
}
