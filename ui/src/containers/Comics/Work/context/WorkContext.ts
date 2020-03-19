import { createContext } from 'react'

interface WorkContext {
  workList: any[]
  currentWork?: any
  workTotal: number
}

export default createContext<WorkContext>({
  workList: [],
  workTotal: 0
})
