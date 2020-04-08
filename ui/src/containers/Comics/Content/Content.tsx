import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentCreation from './components/ContentCreation'
import ContentEdit from './components/ContentEdit'
import ContentDetail from './components/ContentDetail'
import ContentList from './components/ContentList'
import ContentContext from './context/ContentContext'
import { mockContent, mockContentList } from './mockData/mockContent'

export default function Content() {
  return (
    <ContentContext.Provider
      value={{ contentList: mockContentList, currentContent: mockContent, totalContent: mockContentList.length }}
    >
      <Switch>
        <Route exact path={routePath.comics.contentCreation} component={ContentCreation} />
        <Route exact path={routePath.comics.contentEdit} component={ContentEdit} />
        <Route exact path={routePath.comics.contentDetail} component={ContentDetail} />
        <Route exact path={routePath.comics.content} component={ContentList} />
      </Switch>
    </ContentContext.Provider>
  )
}
