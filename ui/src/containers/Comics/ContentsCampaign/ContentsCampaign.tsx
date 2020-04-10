import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentsCampaignCreation from './components/ContentsCampaignCreation'
import ContentsCampaignDetail from './components/ContentsCampaignDetail'
import ContentsCampaignEdit from './components/ContentsCampaignEdit'
import ContentsCampaignList from './components/ContentsCampaignList'
import ContentsCampaignContext from './context/ContentsCampaignContext'
import { mockContent } from './mockData/mockContent'

export default function ContentsCampaign() {
  return (
    <>
      <ContentsCampaignContext.Provider value={{ contentsCampaignList: [], currentContentCampaign: mockContent }}>
        <Switch>
          <Route exact path={routePath.comics.contentsCampaignCreation} component={ContentsCampaignCreation}></Route>
          <Route exact path={routePath.comics.contentsCampaignDetail} component={ContentsCampaignDetail}></Route>
          <Route exact path={routePath.comics.contentsCampaignEdit} component={ContentsCampaignEdit}></Route>
          <Route exact path={routePath.comics.contentsCampaign} component={ContentsCampaignList}></Route>
        </Switch>
      </ContentsCampaignContext.Provider>
    </>
  )
}
