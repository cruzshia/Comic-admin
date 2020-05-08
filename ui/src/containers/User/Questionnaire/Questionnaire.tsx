import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  createQuestionnaireAction,
  getQuestionnaireAction,
  updateQuestionnaireAction,
  resetQuestionnaireAction
} from '@src/reducers/user/questionnaire/questionnaireAction'
import QuestionnaireList from './components/QuestionnaireList'
import QuestionnaireDetail from './components/QuestionnaireDetail'
import QuestionnaireEdit from './components/QuestionnaireEdit'
import QuestionnaireCreation from './components/QuestionnaireCreation'
import QuestionnaireContext, { ActionContext } from './context/QuestionnaireContext'
import { mockQuestionnaireList } from './mockData/mockData'

export default function Questionnaire() {
  const dispatch = useDispatch()
  const { questionnaireTotal, currentQuestionnaire } = useSelector((store: StoreState) => store.questionnaire)
  const handleCreate = useCallback(data => dispatch(createQuestionnaireAction(data)), [dispatch])
  const handleGet = useCallback(id => dispatch(getQuestionnaireAction(id)), [dispatch])
  const handleUpdate = useCallback(data => dispatch(updateQuestionnaireAction(data)), [dispatch])
  const handleReset = useCallback(() => dispatch(resetQuestionnaireAction()), [dispatch])
  return (
    <ActionContext.Provider
      value={{
        onGetQuestionnaire: handleGet,
        onCreateQuestionnaire: handleCreate,
        onUpdateQuestionnaire: handleUpdate,
        onResetQuestionnaire: handleReset
      }}
    >
      <QuestionnaireContext.Provider
        value={{
          questionnaireList: mockQuestionnaireList,
          questionnaireTotal,
          currentQuestionnaire
        }}
      >
        <Switch>
          <Route exact path={routePath.user.questionnaire} component={QuestionnaireList} />
          <Route exact path={routePath.user.questionnaireDetail} component={QuestionnaireDetail} />
          <Route exact path={routePath.user.questionnaireEdit} component={QuestionnaireEdit} />
          <Route exact path={routePath.user.questionnaireCreation} component={QuestionnaireCreation} />
        </Switch>
      </QuestionnaireContext.Provider>
    </ActionContext.Provider>
  )
}
