import { createContext } from 'react'
import Work from '@src/models/comics/work'

interface WorkContext {
  workList: any[]
  currentWork?: any
  workTotal: number
  importLogList: any[]
  logTotal: number
}

export default createContext<WorkContext>({
  workList: [],
  workTotal: 0,
  importLogList: [],
  logTotal: 0
})

interface ActionContext {
  onGetWorkList: () => void
  onGetCsvLogList: () => void
  onGetWork: (workId: string) => void
  onCreateWork: (work: Work) => void
  onUpdateWork: (work: Work) => void
  onResetWork: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetWorkList: () => {},
  onGetCsvLogList: () => {},
  onGetWork: () => {},
  onCreateWork: () => {},
  onUpdateWork: () => {},
  onResetWork: () => {}
})
