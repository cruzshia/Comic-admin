import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import CampaignList from './components/CampaignList'
import CampaignDetail from './components/CampaignDetail'
import CampaignEdit from './components/CampaignEdit'
import CampaignCreation from './components/CampaignCreation'
import CampaignContext, { ActionContext } from './context/CampaignContext'
import {
  getCampaignListAction,
  getAssociatedCampaignListAction,
  getCampaignAction,
  createCampaignAction,
  updateCampaignAction
} from '@src/reducers/comics/campaign/campaignActions'
import { StoreState } from '@src/reducers'
import { Campaign as CampaignModel } from '@src/models/comics/campaign'
import WorksCampaign from './WorksCampaign/WorksCampaign'
import ContentsCampaign from './ContentsCampaign/ContentsCampaign'

export default function Campaign() {
  const dispatch = useDispatch()
  const { campaignList, campaignTotal, associatedCampaignList, associatedCampaignTotal, currentCampaign } = useSelector(
    (state: StoreState) => state.campaign
  )
  const handleGetCampaignList = useCallback((params?: Object) => dispatch(getCampaignListAction(params)), [dispatch])
  const handleGetAssociatedCampaignList = useCallback(
    (campaignId, query) => dispatch(getAssociatedCampaignListAction(campaignId, query)),
    [dispatch]
  )
  const handleGetCampaign = useCallback((campaignId: string) => dispatch(getCampaignAction(campaignId)), [dispatch])
  const handleCreateCampaign = useCallback((campaign: CampaignModel) => dispatch(createCampaignAction(campaign)), [
    dispatch
  ])
  const handleUpdateCampaign = useCallback((campaign: CampaignModel) => dispatch(updateCampaignAction(campaign)), [
    dispatch
  ])

  return (
    <ActionContext.Provider
      value={{
        onGetCampaignList: handleGetCampaignList,
        onGetAssociatedCampaignList: handleGetAssociatedCampaignList,
        onGetCampaign: handleGetCampaign,
        onUpdateCampaign: handleUpdateCampaign,
        onCreateCampaign: handleCreateCampaign
      }}
    >
      <CampaignContext.Provider
        value={{
          campaignList,
          campaignTotal,
          currentCampaign,
          associatedCampaignList,
          associatedCampaignTotal
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
