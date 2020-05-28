import { createContext } from 'react'
import WorkDetail, { Work } from '@src/models/comics/work'
import ImportLog from '@src/models/importLog'

interface WorkContext {
  workList: Work[]
  currentWork?: WorkDetail
  workTotal: number
  importLogList: ImportLog[]
  logTotal: number
}

export default createContext<WorkContext>({
  workList: [],
  workTotal: 0,
  importLogList: [],
  logTotal: 0
})

interface ActionContext {
  onGetWorkList: (params?: Object) => void
  onGetCsvLogList: () => void
  onGetWork: (workId: string) => void
  onCreateWork: (work: WorkDetail) => void
  onUpdateWork: (work: WorkDetail) => void
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
