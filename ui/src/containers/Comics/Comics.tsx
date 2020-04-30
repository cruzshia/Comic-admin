import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { routePath } from '@src/common/appConfig'
import Campaign from './Campaign/Campaign'
import Work from './Work/Work'
import Content from './Content/Content'
import Author from './Author/Author'
import Subscription from './Subscription/Subscription'

export default function Comics() {
  return (
    <DndProvider backend={Backend}>
      <Switch>
        <Route path={routePath.comics.work} component={Work} />
        <Route path={routePath.comics.content} component={Content} />
        <Route path={routePath.comics.campaign} component={Campaign} />
        <Route path={routePath.comics.author} component={Author} />
        <Route path={routePath.comics.subscription} component={Subscription} />
      </Switch>
    </DndProvider>
  )
}
