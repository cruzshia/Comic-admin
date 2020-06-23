import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@src/reducers'
import { routePath } from '@src/common/appConfig'
import {
  getContentsCampaignAction,
  resetContentsCampaignAction
} from '@src/reducers/comics/campaign/contentsCampaignActions'
import { getContentAction, resetContentAction } from '@src/reducers/comics/content/contentActions'
import ContentsCampaignCreation from './components/ContentsCampaignCreation'
import ContentsCampaignDetail from './components/ContentsCampaignDetail'
import ContentsCampaignEdit from './components/ContentsCampaignEdit'
import ContentsCampaignContext, { ActionContext } from './context/ContentsCampaignContext'

export default function ContentsCampaign() {
  const dispatch = useDispatch()
  const { currentCampaign } = useSelector((state: StoreState) => state.contentsCampaign)
  const { currentContent } = useSelector((state: StoreState) => state.content)

  const handleGetCampaign = useCallback((id: string) => dispatch(getContentsCampaignAction(id)), [dispatch])
  const handleResetCampaign = useCallback(() => dispatch(resetContentsCampaignAction()), [dispatch])
  const handleGetContent = useCallback((contentId: string) => dispatch(getContentAction(contentId)), [dispatch])
  const handleResetContent = useCallback(() => dispatch(resetContentAction()), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetContentCampaign: handleGetCampaign,
        onResetContentCampaign: handleResetCampaign,
        onGetContent: handleGetContent,
        onResetContent: handleResetContent
      }}
    >
      <ContentsCampaignContext.Provider
        value={{
          currentContentCampaign: currentCampaign,
          currentContent
        }}
      >
        <Switch>
          <Route exact path={routePath.comics.contentsCampaignCreation} component={ContentsCampaignCreation}></Route>
          <Route exact path={routePath.comics.contentsCampaignDetail} component={ContentsCampaignDetail}></Route>
          <Route exact path={routePath.comics.contentsCampaignEdit} component={ContentsCampaignEdit}></Route>
        </Switch>
      </ContentsCampaignContext.Provider>
    </ActionContext.Provider>
  )
}
