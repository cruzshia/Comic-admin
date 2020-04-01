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
