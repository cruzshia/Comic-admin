import { createContext } from 'react'

interface WorkContext {
  workList: any[]
  currentWork?: any
}

const workContext = createContext<WorkContext>({
  workList: []
})

export default workContext
