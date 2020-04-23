import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import { getContentListAction } from '@src/reducers/comics/content/contentActions'
import ContentCreation from './components/ContentCreation'
import ContentEdit from './components/ContentEdit'
import ContentDetail from './components/ContentDetail'
import ContentList from './components/ContentList'
import ContentContext, { ActionContext } from './context/ContentContext'
import { mockContent } from './mockData/mockContent'

export default function Content() {
  const dispatch = useDispatch()
  const { contentList } = useSelector((state: StoreState) => state.content)
  const handleGetContentList = useCallback(() => dispatch(getContentListAction()), [dispatch])

  return (
    <ActionContext.Provider value={{ onGetContentList: handleGetContentList }}>
      <ContentContext.Provider value={{ contentList, currentContent: mockContent, totalContent: contentList.length }}>
        <Switch>
          <Route exact path={routePath.comics.contentCreation} component={ContentCreation} />
          <Route exact path={routePath.comics.contentEdit} component={ContentEdit} />
          <Route exact path={routePath.comics.contentDetail} component={ContentDetail} />
          <Route exact path={routePath.comics.content} component={ContentList} />
        </Switch>
      </ContentContext.Provider>
    </ActionContext.Provider>
  )
}
