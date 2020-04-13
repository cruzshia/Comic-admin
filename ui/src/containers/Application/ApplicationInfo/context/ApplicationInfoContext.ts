import { createContext } from 'react'

interface ApplicationInfoContext {
  infoList: any[]
  currentInfo?: any
  infoTotal: number
}

export default createContext<ApplicationInfoContext>({
  infoList: [],
  infoTotal: 0
})
