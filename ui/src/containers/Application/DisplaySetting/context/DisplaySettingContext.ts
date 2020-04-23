import { createContext } from 'react'

interface DisplaySettingContext {
  settingList: any[]
  currentSetting?: any
  settingTotal: number
}

export default createContext<DisplaySettingContext>({
  settingList: [],
  settingTotal: 0
})

interface DisplaySettingActionContext {
  onGetDisplaySettingList: () => void
  onDeleteDisplaySetting: (_: string[]) => void
  onCreateDisplaySetting: (_: any) => void
}

export const ActionContext = createContext<DisplaySettingActionContext>({
  onGetDisplaySettingList: () => {},
  onDeleteDisplaySetting: (_: string[]) => {},
  onCreateDisplaySetting: (_: any) => {}
})
