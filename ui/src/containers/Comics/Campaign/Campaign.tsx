import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import CampaignList from './components/CampaignList'
import CampaignContext from './context/CampaignContext'
import { mockCampaignList } from './mockData/mockData'

export default function Campaign() {
  return (
    <CampaignContext.Provider value={{ campaignList: mockCampaignList, campaignTotal: mockCampaignList.length }}>
      <Switch>
        <Route exact path={routePath.comics.campaign} component={CampaignList} />
      </Switch>
    </CampaignContext.Provider>
  )
}
