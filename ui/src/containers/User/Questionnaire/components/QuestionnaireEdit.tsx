import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import QuestionnaireContext, { ActionContext } from '../context/QuestionnaireContext'
import { emptyQuestionnaire } from '@src/reducers/user/questionnaire/questionnaireReducer'

export default function QuestionnaireEdit() {
  const { currentQuestionnaire = emptyQuestionnaire } = useContext(QuestionnaireContext)
  const { onGetQuestionnaire, onResetQuestionnaire } = useContext(ActionContext)
  const { id } = useParams()

  useEffect(() => {
    onGetQuestionnaire(id!)
    return () => onResetQuestionnaire()
  }, [onResetQuestionnaire, onGetQuestionnaire, id])

  return <div>{JSON.stringify(currentQuestionnaire)}</div>
}
