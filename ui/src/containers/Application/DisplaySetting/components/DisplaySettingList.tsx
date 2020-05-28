import React, { useMemo, useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import ListTable, { Padding } from '@src/components/table/ListTable'
import { StyledCheckBox } from '@src/components/form'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as DeleteIcon } from '@src/assets/common/delete.svg'
import commonMessages from '@src/messages'
import { useSort, useCheckbox, usePaging } from '@src/hooks'
import { successSubject } from '@src/utils/responseSubject'
import { DisplaySettingActionType } from '@src/reducers/application/displaySetting/displaySettingActions'
import DisplaySettingContext, { ActionContext } from '../context/DisplaySettingContext'
import Capsule from '../../components/Capsule'
import { Status } from '../../constants'
import applicationMessages from '../../messages'
import { BREADCRUMBS } from '../utils'
import messages from '../messages'
import SearchBlock from './SearchBlock'

const useStyles = makeStyles({
  table: {
    '& .ListTable-col-2': {
      width: 100
    },
    '& .ListTable-col-3': {
      width: 140
    },
    '& .ListTable-col-4,.ListTable-col-5': {
      width: 150
    }
  },
  tbody: {
    '& .reservedRow': {
      backgroundColor: '#F8FFEC'
    },
    '& .closedRow': {
      backgroundColor: '#EDEDED'
    }
  }
})

export default function DisplaySettingList() {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { settingList, settingTotal } = useContext(DisplaySettingContext)
  const { onGetDisplaySettingList, onDeleteDisplaySetting } = useContext(ActionContext)
  const { sortBy, handleSort } = useSort<string>('deliveryStartTime')
  const { pagination, handlePageChange } = usePaging({ total: settingTotal })
  const { onCheckAll, handleCheck, checkedList, isChecked, isCheckAll, onResetCheck } = useCheckbox()

  useEffect(() => {
    onGetDisplaySettingList()
  }, [onGetDisplaySettingList])

  useEffect(() => {
    const subscription = successSubject.subscribe([DisplaySettingActionType.DELETE_SUCCESS], () => {
      onResetCheck()
      onGetDisplaySettingList()
    })
    return () => subscription.unsubscribe()
  }, [onGetDisplaySettingList, onResetCheck])

  const breadcrumbList = useMemo(() => BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) })), [
    formatMessage
  ])
  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.create)}
        onClick={() => {
          history.push(routePath.application.displaySettingCreation)
        }}
      />
    ],
    [formatMessage, history]
  )
  const handleSearch = useCallback(data => console.log(data), [])

  const settingDataList = useMemo(
    () =>
      settingList
        .map(({ status, screen, ...rest }) => ({
          ...rest,
          classnames: `${Status[status as keyof typeof Status]}Row`,
          checkbox: <StyledCheckBox value={rest.id} checked={isChecked(rest.id)} onCheck={handleCheck} />,
          status: <Capsule status={status} />,
          display: formatMessage(messages[screen as keyof typeof messages])
        }))
        .sort((a: any, b: any) => (Date.parse(a[sortBy.key]) - Date.parse(b[sortBy.key])) * sortBy.multiplier),
    [sortBy, handleCheck, formatMessage, isChecked, settingList]
  )

  const handleCheckAll = useCallback(() => {
    onCheckAll(settingDataList)
  }, [onCheckAll, settingDataList])

  const theadList = useMemo(
    () => [
      {
        id: 'checkbox',
        label: <StyledCheckBox value='' checked={isCheckAll} onCheck={handleCheckAll} />,
        padding: Padding.Checkbox
      },
      { id: 'status', label: formatMessage(applicationMessages.status) },
      { id: 'screen', label: formatMessage(messages.screen) },
      {
        id: 'deliveryStartTime',
        label: formatMessage(commonMessages.deliveryStartDateTime),
        onSort: handleSort
      },
      {
        id: 'creationTime',
        label: formatMessage(commonMessages.createDateTime),
        onSort: handleSort
      },
      {
        id: 'spacer',
        label: ''
      }
    ],
    [handleSort, formatMessage, handleCheckAll, isCheckAll]
  )

  const handleDelete = useCallback(() => onDeleteDisplaySetting(checkedList), [checkedList, onDeleteDisplaySetting])

  const tableButtonList = useMemo(
    () => [
      <Button
        theme={Theme.LIGHT}
        buttonText={formatMessage(commonMessages.delete)}
        icon={DeleteIcon}
        onClick={handleDelete}
      />
    ],
    [formatMessage, handleDelete]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tbodyClass={classes.tbody}
        tableClass={classes.table}
        theadList={theadList}
        dataList={settingDataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        buttonList={tableButtonList}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback(id => history.push(routePath.application.displaySettingEdit.replace(':id', id)), [
          history
        ])}
      />
    </>
  )
}
