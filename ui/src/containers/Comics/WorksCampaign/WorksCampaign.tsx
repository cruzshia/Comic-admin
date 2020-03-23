import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import WorksCampaignEdit from './components/WorksCampaignEdit'
import WorksCampaignList from './components/WorksCampaignList'
import WorksCampaignDetail from './components/WorksCampaignDetail'
import WorksCampaignCreation from './components/WorksCampaignCreation'
import WorksCampaignContext from './worksCampaignContext'

export default function WorksCampaign() {
  return (
    <WorksCampaignContext.Provider value={{ campaignList: [], currentCampaign: {}, campaignTotal: 0 }}>
      <Switch>
        <Route exact path={routePath.comics.worksCampaign} component={WorksCampaignList} />
        <Route exact path={routePath.comics.worksCampaignEdit} component={WorksCampaignEdit} />
        <Route exact path={routePath.comics.worksCampaignDetail} component={WorksCampaignDetail} />
        <Route exact path={routePath.comics.worksCampaignCreation} component={WorksCampaignCreation} />
      </Switch>
    </WorksCampaignContext.Provider>
  )
}
