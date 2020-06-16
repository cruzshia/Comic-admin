import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import {
  getWorksCampaignAction,
  createWorksCampaignAction,
  updateWorksCampaignAction,
  resetWorksCampaignAction
} from '@src/reducers/comics/campaign/worksCampaignActions'
import { routePath } from '@src/common/appConfig'
import { WorkCampaignCreate } from '@src/models/comics/worksCampaign'
import WorksCampaignEdit from './components/WorksCampaignEdit'
import WorksCampaignDetail from './components/WorksCampaignDetail'
import WorksCampaignCreation from './components/WorksCampaignCreation'
import WorksCampaignContext, { ActionContext } from './context/worksCampaignContext'

export default function WorksCampaign() {
  const dispatch = useDispatch()
  const { currentCampaign } = useSelector((state: StoreState) => state.worksCampaign)
  const handleGetWorksCampaign = useCallback((campaignId: string) => dispatch(getWorksCampaignAction(campaignId)), [
    dispatch
  ])
  const handleCreateWorksCampaign = useCallback(
    (campaign: WorkCampaignCreate) => dispatch(createWorksCampaignAction(campaign)),
    [dispatch]
  )
  const handleUpdateWorksCampaign = useCallback(
    (campaign: WorkCampaignCreate) => dispatch(updateWorksCampaignAction(campaign)),
    [dispatch]
  )
  const handleResetWorksCampaign = useCallback(() => dispatch(resetWorksCampaignAction()), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetWorksCampaign: handleGetWorksCampaign,
        onCreateWorksCampaign: handleCreateWorksCampaign,
        onUpdateWorksCampaign: handleUpdateWorksCampaign,
        onResetWorksCampaign: handleResetWorksCampaign
      }}
    >
      <WorksCampaignContext.Provider value={{ currentCampaign }}>
        <Switch>
          <Route exact path={routePath.comics.worksCampaignEdit} component={WorksCampaignEdit} />
          <Route exact path={routePath.comics.worksCampaignDetail} component={WorksCampaignDetail} />
          <Route exact path={routePath.comics.worksCampaignCreation} component={WorksCampaignCreation} />
        </Switch>
      </WorksCampaignContext.Provider>
    </ActionContext.Provider>
  )
}
