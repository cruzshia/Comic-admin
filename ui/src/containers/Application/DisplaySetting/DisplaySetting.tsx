import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import DisplaySettingList from './components/DisplaySettingList'
import DisplaySettingEdit from './components/DisplaySettingEdit'
import DisplaySettingCreation from './components/DisplaySettingCreation'
import DisplaySettingContext from './context/DisplaySettingContext'
import { mockSettingList, mockSettingTotal, mockSettingDetail } from './mockData/mockSetting'

export default function DisplaySetting() {
  return (
    <Switch>
      <DisplaySettingContext.Provider
        value={{ settingList: mockSettingList, settingTotal: mockSettingTotal, currentSetting: mockSettingDetail }}
      >
        <Route exact path={routePath.application.displaySetting} component={DisplaySettingList} />
        <Route exact path={routePath.application.displaySettingCreation} component={DisplaySettingCreation} />
        <Route exact path={routePath.application.displaySettingEdit} component={DisplaySettingEdit} />
      </DisplaySettingContext.Provider>
    </Switch>
  )
}
