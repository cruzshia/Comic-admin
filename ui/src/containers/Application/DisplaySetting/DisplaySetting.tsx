import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getDisplaySettingListAction,
  deleteDisplaySettingAction,
  createDisplaySettingAction
} from '@src/reducers/application/displaySetting/displaySettingActions'
import { DisplaySetting as DisplaySettingModel } from '@src/models/application/displaySetting'
import DisplaySettingList from './components/DisplaySettingList'
import DisplaySettingEdit from './components/DisplaySettingEdit'
import DisplaySettingCreation from './components/DisplaySettingCreation'
import DisplaySettingContext, { ActionContext } from './context/DisplaySettingContext'
import { mockSettingDetail } from '../../../epics/application/displaySetting/mockData/mockSetting'

export default function DisplaySetting() {
  const dispatch = useDispatch()
  const { settingList } = useSelector((store: StoreState) => store.displaySetting)
  const handleGetList = useCallback(() => dispatch(getDisplaySettingListAction()), [dispatch])
  const handleDelete = useCallback((list: string[]) => dispatch(deleteDisplaySettingAction(list)), [dispatch])
  const handleCreate = useCallback((data: DisplaySettingModel) => dispatch(createDisplaySettingAction(data)), [
    dispatch
  ])
  return (
    <Switch>
      <ActionContext.Provider
        value={{
          onGetDisplaySettingList: handleGetList,
          onDeleteDisplaySetting: handleDelete,
          onCreateDisplaySetting: handleCreate
        }}
      >
        <DisplaySettingContext.Provider
          value={{
            settingList,
            settingTotal: settingList.length,
            currentSetting: mockSettingDetail
          }}
        >
          <Route exact path={routePath.application.displaySetting} component={DisplaySettingList} />
          <Route exact path={routePath.application.displaySettingCreation} component={DisplaySettingCreation} />
          <Route exact path={routePath.application.displaySettingEdit} component={DisplaySettingEdit} />
        </DisplaySettingContext.Provider>
      </ActionContext.Provider>
    </Switch>
  )
}
