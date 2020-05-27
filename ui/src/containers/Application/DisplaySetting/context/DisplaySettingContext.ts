import { createContext } from 'react'
import { DisplaySetting } from '@src/models/application/displaySetting'

interface DisplaySettingContext {
  settingList: DisplaySetting[]
  currentSetting?: DisplaySetting
  settingTotal: number
}

export default createContext<DisplaySettingContext>({
  settingList: [],
  settingTotal: 0
})

interface DisplaySettingActionContext {
  onGetDisplaySettingList: () => void
  onDeleteDisplaySetting: (_: string[]) => void
  onCreateDisplaySetting: (_: DisplaySetting) => void
  onGetDisplaySetting: (_: string) => void
  onUpdateDisplaySetting: (_: DisplaySetting) => void
}

export const ActionContext = createContext<DisplaySettingActionContext>({
  onGetDisplaySettingList: () => {},
  onDeleteDisplaySetting: () => {},
  onCreateDisplaySetting: () => {},
  onGetDisplaySetting: () => {},
  onUpdateDisplaySetting: () => {}
})
