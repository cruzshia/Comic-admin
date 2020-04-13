import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import QuestionnaireList from './components/QuestionnaireList'
import QuestionnaireDetail from './components/QuestionnaireDetail'
import QuestionnaireEdit from './components/QuestionnaireEdit'
import QuestionnaireCreation from './components/QuestionnaireCreation'
import QuestionnaireContext from './context/QuestionnaireContext'
import { mockQuestionnaireList } from './mockData/mockData'

export default function Questionnaire() {
  return (
    <QuestionnaireContext.Provider
      value={{ questionnaireList: mockQuestionnaireList, questionnaireTotal: mockQuestionnaireList.length }}
    >
      <Switch>
        <Route exact path={routePath.user.questionnaire} component={QuestionnaireList} />
        <Route exact path={routePath.user.questionnaireDetail} component={QuestionnaireDetail} />
        <Route exact path={routePath.user.questionnaireEdit} component={QuestionnaireEdit} />
        <Route exact path={routePath.user.questionnaireCreation} component={QuestionnaireCreation} />
      </Switch>
    </QuestionnaireContext.Provider>
  )
}
