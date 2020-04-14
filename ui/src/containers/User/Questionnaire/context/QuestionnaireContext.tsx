import { createContext } from 'react'

interface Context {
  questionnaireList: any[]
  currentQuestionnaire?: any
  questionnaireTotal: number
}

export default createContext<Context>({
  questionnaireList: [],
  questionnaireTotal: 0
})
