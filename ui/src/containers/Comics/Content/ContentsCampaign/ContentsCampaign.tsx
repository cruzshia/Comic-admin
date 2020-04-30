import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentsCampaignCreation from './components/ContentsCampaignCreation'
import ContentsCampaignDetail from './components/ContentsCampaignDetail'
import ContentsCampaignEdit from './components/ContentsCampaignEdit'
import ContentsCampaignContext from './context/ContentsCampaignContext'
import { mockCampaign, mockCampaignList } from './mockData/mockContent'

export default function ContentsCampaign() {
  return (
    <>
      <ContentsCampaignContext.Provider
        value={{
          contentsCampaignList: mockCampaignList,
          currentContentCampaign: mockCampaign,
          contentCampaignTotal: mockCampaignList.length
        }}
      >
        <Switch>
          <Route exact path={routePath.comics.contentsCampaignCreation} component={ContentsCampaignCreation}></Route>
          <Route exact path={routePath.comics.contentsCampaignDetail} component={ContentsCampaignDetail}></Route>
          <Route exact path={routePath.comics.contentsCampaignEdit} component={ContentsCampaignEdit}></Route>
        </Switch>
      </ContentsCampaignContext.Provider>
    </>
  )
}
