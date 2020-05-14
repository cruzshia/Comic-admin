import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import CampaignList from './components/CampaignList'
import CampaignDetail from './components/CampaignDetail'
import CampaignEdit from './components/CampaignEdit'
import CampaignCreation from './components/CampaignCreation'
import CampaignContext, { ActionContext } from './context/CampaignContext'
import { getCampaignListAction } from '@src/reducers/comics/campaign/campaignActions'
import { StoreState } from '@src/reducers'
import { mockCampaign, mockSubCampaignList } from './mockData/mockData'
import WorksCampaign from './WorksCampaign/WorksCampaign'
import ContentsCampaign from './ContentsCampaign/ContentsCampaign'

export default function Campaign() {
  const dispatch = useDispatch()
  const { campaignList, campaignTotal } = useSelector((state: StoreState) => state.campaign)
  const handleGetCampaignList = useCallback(() => dispatch(getCampaignListAction()), [dispatch])

  return (
    <ActionContext.Provider value={{ onGetCampaignList: handleGetCampaignList }}>
      <CampaignContext.Provider
        value={{
          campaignList,
          campaignTotal,
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
    </ActionContext.Provider>
  )
}
