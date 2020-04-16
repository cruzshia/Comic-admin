import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import List from './List/List'
import Comment from './Comment/Comment'
import NGWord from './NGWord/NGWord'
import ReturnGift from './ReturnGift/ReturnGift'
import Inquiry from './Inquiry/Inquiry'
import Notification from './Notification/Notification'
import Questionnaire from './Questionnaire/Questionnaire'
import History from './History/History'

export default function User() {
  return (
    <Switch>
      <Route path={routePath.user.list} component={List} />
      <Route path={routePath.user.comment} component={Comment} />
      <Route exact path={routePath.user.ngWord} component={NGWord} />
      <Route exact path={routePath.user.returnGift} component={ReturnGift} />
      <Route path={routePath.user.inquiry} component={Inquiry} />
      <Route path={routePath.user.notification} component={Notification} />
      <Route path={routePath.user.questionnaire} component={Questionnaire} />
      <Route path={routePath.user.history} component={History} />
    </Switch>
  )
}
