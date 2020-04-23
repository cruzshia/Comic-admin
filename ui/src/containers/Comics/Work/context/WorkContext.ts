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
  onGetWork: (workId: string) => void
  onCreateWork: (work: Work) => void
  onUpdateWork: (work: Work) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetWorkList: () => {},
  onGetWork: (_: string) => {},
  onCreateWork: (_: Work) => {},
  onUpdateWork: (_: Work) => {}
})
