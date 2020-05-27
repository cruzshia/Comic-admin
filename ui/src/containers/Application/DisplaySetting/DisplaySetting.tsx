import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import { StoreState } from '@src/reducers'
import {
  getDisplaySettingListAction,
  deleteDisplaySettingAction,
  createDisplaySettingAction,
  getDisplaySettingAction,
  updateDisplaySettingAction
} from '@src/reducers/application/displaySetting/displaySettingActions'
import { DisplaySetting as DisplaySettingModel } from '@src/models/application/displaySetting'
import DisplaySettingList from './components/DisplaySettingList'
import DisplaySettingEdit from './components/DisplaySettingEdit'
import DisplaySettingCreation from './components/DisplaySettingCreation'
import DisplaySettingContext, { ActionContext } from './context/DisplaySettingContext'

export default function DisplaySetting() {
  const dispatch = useDispatch()
  const { settingList, settingTotal, currentSetting } = useSelector((store: StoreState) => store.displaySetting)
  const handleGetList = useCallback(() => dispatch(getDisplaySettingListAction()), [dispatch])
  const handleDelete = useCallback((list: string[]) => dispatch(deleteDisplaySettingAction(list)), [dispatch])
  const handleCreate = useCallback((data: DisplaySettingModel) => dispatch(createDisplaySettingAction(data)), [
    dispatch
  ])
  const handleGet = useCallback((id: string) => dispatch(getDisplaySettingAction(id)), [dispatch])
  const handleUpdate = useCallback((data: DisplaySettingModel) => dispatch(updateDisplaySettingAction(data)), [
    dispatch
  ])

  return (
    <Switch>
      <ActionContext.Provider
        value={{
          onGetDisplaySettingList: handleGetList,
          onDeleteDisplaySetting: handleDelete,
          onCreateDisplaySetting: handleCreate,
          onGetDisplaySetting: handleGet,
          onUpdateDisplaySetting: handleUpdate
        }}
      >
        <DisplaySettingContext.Provider
          value={{
            settingList,
            settingTotal,
            currentSetting
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
