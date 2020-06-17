import { createContext } from 'react'
import ApplicationInfo from '@src/models/application/applicationInfo'

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
  onGetApplicationInfo: (_: string) => void
  onCreateApplicationInfo: (_: ApplicationInfo) => void
  onUpdateApplicationInfo: (_: ApplicationInfo) => void
  onResetApplicationInfo: () => void
}

export const ActionContext = createContext<ApplicationInfoActionContext>({
  onGetApplicationInfoList: () => {},
  onGetApplicationInfo: (_: string) => {},
  onCreateApplicationInfo: (_: ApplicationInfo) => {},
  onUpdateApplicationInfo: (_: ApplicationInfo) => {},
  onResetApplicationInfo: () => {}
})
