import React, { useContext } from 'react'
import { ActionContext } from '../context/QuestionnaireContext'

export default function QuestionnaireCreation() {
  const { onCreateQuestionnaire } = useContext(ActionContext)

  return (
    <>
      <div>create</div>
      <div>{onCreateQuestionnaire.toString()}</div>
    </>
  )
}
