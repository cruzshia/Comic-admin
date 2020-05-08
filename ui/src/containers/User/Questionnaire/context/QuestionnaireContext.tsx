import { createContext } from 'react'
import { Questionnaire } from '@src/models/user/questionnaire'

interface Context {
  questionnaireList: any[]
  currentQuestionnaire?: any
  questionnaireTotal: number
}

export default createContext<Context>({
  questionnaireList: [],
  questionnaireTotal: 0
})

interface QuestionnaireActionContext {
  onGetQuestionnaireList: () => void
  onGetQuestionnaire: (_: string) => void
  onCreateQuestionnaire: (_: Questionnaire) => void
  onUpdateQuestionnaire: (_: Questionnaire) => void
  onResetQuestionnaire: () => void
}

export const ActionContext = createContext<QuestionnaireActionContext>({
  onGetQuestionnaireList: () => {},
  onGetQuestionnaire: () => {},
  onCreateQuestionnaire: () => {},
  onUpdateQuestionnaire: () => {},
  onResetQuestionnaire: () => {}
})
