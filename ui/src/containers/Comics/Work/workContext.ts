import { createContext } from 'react'

interface WorkContext {
  workList: any[]
  currentWork?: any
  workTotal: number
}

const workContext = createContext<WorkContext>({
  workList: [],
  workTotal: 0
})

export default workContext
