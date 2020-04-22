import React, { useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routePath } from '@src/common/appConfig'
import {
  getDisplaySettingListAction,
  deleteDisplaySettingAction
} from '@src/reducers/application/displaySetting/displaySettingActions'
import { StoreState } from '@src/reducers'
import DisplaySettingList from './components/DisplaySettingList'
import DisplaySettingEdit from './components/DisplaySettingEdit'
import DisplaySettingCreation from './components/DisplaySettingCreation'
import DisplaySettingContext, { ActionContext } from './context/DisplaySettingContext'
import { mockSettingDetail } from '../../../epics/application/displaySetting/mockData/mockSetting'

export default function DisplaySetting() {
  const dispatch = useDispatch()
  const { settingList } = useSelector((store: StoreState) => store.displaySetting)
  const handleGetList = useCallback(() => {
    dispatch(getDisplaySettingListAction())
  }, [dispatch])
  const handleDelete = useCallback(
    (list: string[]) => {
      dispatch(deleteDisplaySettingAction(list))
    },
    [dispatch]
  )
  return (
    <Switch>
      <ActionContext.Provider value={{ onGetDisplaySettingList: handleGetList, onDeleteDisplaySetting: handleDelete }}>
        <DisplaySettingContext.Provider
          value={{
            settingList: settingList,
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
