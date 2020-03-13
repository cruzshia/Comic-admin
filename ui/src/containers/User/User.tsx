import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import UserList from './List/UserList'
import Comment from './Comment/Comment'
import NGWord from './NGWord/NGWordList'
import ReturnGift from './ReturnGift/ReturnGift'
import Inquiry from './Inquiry/Inquiry'
import Notification from './Notification/Notification'
import Questionnaire from './Questionnaire/Questionnaire'

export default function User() {
  return (
    <Switch>
      <Route exact path={routePath.user.list} component={UserList} />
      <Route exact path={routePath.user.comment} component={Comment} />
      <Route exact path={routePath.user.ngWord} component={NGWord} />
      <Route exact path={routePath.user.returnGift} component={ReturnGift} />
      <Route exact path={routePath.user.inquiry} component={Inquiry} />
      <Route exact path={routePath.user.notification} component={Notification} />
      <Route exact path={routePath.user.questionnaire} component={Questionnaire} />
    </Switch>
  )
}
