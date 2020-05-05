import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import CampaignList from './components/CampaignList'
import CampaignDetail from './components/CampaignDetail'
import CampaignEdit from './components/CampaignEdit'
import CampaignCreation from './components/CampaignCreation'
import CampaignContext from './context/CampaignContext'
import { mockCampaignList, mockCampaign, mockSubCampaignList } from './mockData/mockData'
import WorksCampaign from './WorksCampaign/WorksCampaign'
import ContentsCampaign from './ContentsCampaign/ContentsCampaign'

export default function Campaign() {
  return (
    <CampaignContext.Provider
      value={{
        campaignList: mockCampaignList,
        campaignTotal: mockCampaignList.length,
        currentCampaign: mockCampaign,
        subCampaignList: mockSubCampaignList,
        subCampaignTotal: mockSubCampaignList.length
      }}
    >
      <Switch>
        <Route exact path={routePath.comics.campaign} component={CampaignList} />
        <Route exact path={routePath.comics.campaignCreation} component={CampaignCreation} />
        <Route exact path={routePath.comics.campaignEdit} component={CampaignEdit} />
        <Route exact path={routePath.comics.campaignDetail} component={CampaignDetail} />
        <Route path={routePath.comics.worksCampaign} component={WorksCampaign} />
        <Route path={routePath.comics.contentsCampaign} component={ContentsCampaign} />
      </Switch>
    </CampaignContext.Provider>
  )
}
