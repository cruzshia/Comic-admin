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

interface ApplicationInfoActionContext {
  onGetApplicationInfoList: () => void
}

export const ActionContext = createContext<ApplicationInfoActionContext>({
  onGetApplicationInfoList: () => {}
})
