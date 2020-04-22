import { createContext } from 'react'

interface DisplaySettingContext {
  settingList: any[]
  currentSetting?: any
  settingTotal: number
}

interface DisplaySettingActionContext {
  onGetDisplaySettingList: () => void
  onDeleteDisplaySetting: (list: string[]) => void
}

export default createContext<DisplaySettingContext>({
  settingList: [],
  settingTotal: 0
})

export const ActionContext = createContext<DisplaySettingActionContext>({
  onGetDisplaySettingList: () => {},
  onDeleteDisplaySetting: list => {}
})
