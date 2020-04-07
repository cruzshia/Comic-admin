import { createContext } from 'react'

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
