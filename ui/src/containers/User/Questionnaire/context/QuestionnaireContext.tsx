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
  onGetQuestionnaire: (_: string) => void
  onCreateQuestionnaire: (_: Questionnaire) => void
  onUpdateQuestionnaire: (_: Questionnaire) => void
  onResetQuestionnaire: () => void
}

export const ActionContext = createContext<QuestionnaireActionContext>({
  onGetQuestionnaire: () => {},
  onCreateQuestionnaire: () => {},
  onUpdateQuestionnaire: () => {},
  onResetQuestionnaire: () => {}
})
