import React, { useMemo, useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles, FormHelperText } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as DeleteIcon } from '@src/assets/common/delete.svg'
import ListTable, { Padding, SortOrder } from '@src/components/table/ListTable'
import { StyledCheckBox } from '@src/components/form'
import { usePaging, useSort, useCheckbox } from '@src/hooks'
import commonMessages from '@src/messages'
import { successSubject } from '@src/utils/responseSubject'
import { PushNotificationActionType } from '@src/reducers/application/pushNotification/pushNotificationActions'
import Capsule from '../../components/Capsule'
import applicationMessages from '../../messages'
import { Status } from '../../constants'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import SearchBlock from './SearchBlock'
import PushNotificationContext, { ActionContext } from '../context/PushNotificationContext'

const useStyles = makeStyles({
  table: {
    '& .ListTable-col-2': {
      width: 100
    },
    '& .ListTable-col-3': {
      width: 260
    },
    '& .ListTable-col-4': {
      width: 170
    },
    '& .ListTable-col-5': {
      width: 100
    },
    '& .ListTable-col-6': {
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

export default function PushNotificationList() {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { notificationList, notificationTotal } = useContext(PushNotificationContext)
  const { onGetPushNotificationList, onDeletePushNotification } = useContext(ActionContext)
  const { sortBy, handleSort } = useSort<string>('scheduledStartTime')
  const { pagination, handlePageChange } = usePaging({ total: notificationTotal })
  const { onCheckAll, handleCheck, checkedList, isChecked, isCheckAll, onResetCheck } = useCheckbox()

  useEffect(() => {
    onGetPushNotificationList()
  }, [onGetPushNotificationList])

  useEffect(() => {
    const subscription = successSubject.subscribe([PushNotificationActionType.DELETE_SUCCESS], () => {
      onResetCheck()
      onGetPushNotificationList()
    })
    return () => subscription.unsubscribe()
  }, [onGetPushNotificationList, onResetCheck])

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
          history.push(routePath.application.pushNotificationCreation)
        }}
      />
    ],
    [formatMessage, history]
  )
  const handleSearch = useCallback(data => console.log(data), [])

  const handleDelete = useCallback(() => onDeletePushNotification(checkedList), [checkedList, onDeletePushNotification])

  const tableButtonList = useMemo(
    () => [<Button buttonText={formatMessage(commonMessages.delete)} icon={DeleteIcon} onClick={handleDelete} />],
    [handleDelete, formatMessage]
  )

  const listTableData = useMemo(
    () =>
      notificationList
        .map(({ id, status, detail, ...rest }) => ({
          id: id,
          classnames: detail ? '' : `${Status[status as keyof typeof Status]}Row`,
          data: {
            checkbox: <StyledCheckBox value={id} checked={isChecked(id)} onCheck={handleCheck} />,
            status: <Capsule status={status} />,
            ...rest,
            detail: detail && <FormHelperText className='error'>{detail}</FormHelperText>
          }
        }))
        .sort((a: any, b: any) => {
          return (
            (new Date(a.data[sortBy.key]).getTime() - new Date(b.data[sortBy.key]).getTime()) *
            (sortBy.order === SortOrder.Asc ? 1 : -1)
          )
        }),
    [notificationList, handleCheck, sortBy.key, sortBy.order, isChecked]
  )

  const handleCheckAll = useCallback(() => {
    onCheckAll(listTableData)
  }, [onCheckAll, listTableData])

  const theadList = useMemo(
    () => [
      {
        id: 'checkbox',
        label: <StyledCheckBox value='' checked={isCheckAll} onCheck={handleCheckAll} />,
        padding: Padding.Checkbox
      },
      { id: 'status', label: formatMessage(applicationMessages.status) },
      { id: 'message', label: formatMessage(commonMessages.message) },
      { id: 'applicationId', label: formatMessage(applicationMessages.applicationId) },
      { id: 'timesPushed', label: formatMessage(messages.pushedTimes) },
      {
        id: 'scheduledStartTime',
        label: formatMessage(messages.scheduledStartTime),
        onSort: handleSort
      },
      { id: 'detail', label: formatMessage(commonMessages.detail) }
    ],
    [handleSort, formatMessage, handleCheckAll, isCheckAll]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.list)} buttonList={buttonList} />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        tbodyClass={classes.tbody}
        tableClass={classes.table}
        theadList={theadList}
        dataList={listTableData}
        pagination={pagination}
        onPageChange={handlePageChange}
        buttonList={tableButtonList}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onRowClick={useCallback(
          id => {
            history.push(routePath.application.pushNotificationEdit.replace(':id', id))
          },
          [history]
        )}
      />
    </>
  )
}
