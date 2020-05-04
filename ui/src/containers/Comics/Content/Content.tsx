import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getContentListAction,
  getContentAction,
  createContentAction,
  updateContentAction
} from '@src/reducers/comics/content/contentActions'
import ContentCreation from './components/ContentCreation'
import ContentEdit from './components/ContentEdit'
import ContentDetail from './components/ContentDetail'
import ContentList from './components/ContentList'
import ContentImportLogs from './components/ContentImportLogs'
import ContentModel from '@src/models/comics/content'
import ContentContext, { ActionContext } from './context/ContentContext'

export default function Content() {
  const dispatch = useDispatch()
  const { contentList, currentContent } = useSelector((state: StoreState) => state.content)
  const handleGetContent = useCallback((contentId: string) => dispatch(getContentAction(contentId)), [dispatch])
  const handleGetContentList = useCallback(() => dispatch(getContentListAction()), [dispatch])
  const handleCreateContent = useCallback((content: ContentModel) => dispatch(createContentAction(content)), [dispatch])
  const handleUpdateContent = useCallback((content: ContentModel) => dispatch(updateContentAction(content)), [dispatch])

  return (
    <ActionContext.Provider
      value={{
        onGetContentList: handleGetContentList,
        onGetContent: handleGetContent,
        onCreateContent: handleCreateContent,
        onUpdateContent: handleUpdateContent
      }}
    >
      <ContentContext.Provider value={{ contentList, currentContent, totalContent: contentList.length }}>
        <Switch>
          <Route exact path={routePath.comics.contentCreation} component={ContentCreation} />
          <Route exact path={routePath.comics.contentEdit} component={ContentEdit} />
          <Route exact path={routePath.comics.contentDetail} component={ContentDetail} />
          <Route exact path={routePath.comics.content} component={ContentList} />
          <Route exact path={routePath.comics.contentImportLogs} component={ContentImportLogs} />
        </Switch>
      </ContentContext.Provider>
    </ActionContext.Provider>
  )
}
