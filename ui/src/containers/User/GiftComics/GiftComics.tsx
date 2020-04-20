import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import GiftComicsCreation from './components/GiftComicsCreation'
import GiftComicsBatchLogs from './components/GiftComicsBatchLogs'

export default function GiftComics() {
  return (
    <>
      <Switch>
        <Route exact path={routePath.user.giftComicsCreation} component={GiftComicsCreation}></Route>
        <Route exact path={routePath.user.giftComicsBatchLogs} component={GiftComicsBatchLogs}></Route>
      </Switch>
    </>
  )
}
