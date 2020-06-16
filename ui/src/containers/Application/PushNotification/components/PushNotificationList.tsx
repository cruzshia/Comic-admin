import React, { useMemo, useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles, FormHelperText } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as DeleteIcon } from '@src/assets/common/delete.svg'
import ListTable, { Padding } from '@src/components/table/ListTable'
import { StyledCheckBox } from '@src/components/form'
import { usePaging, useCheckbox } from '@src/hooks'
import commonMessages from '@src/messages'
import { successSubject } from '@src/utils/responseSubject'
import { PushNotificationActionType } from '@src/reducers/application/pushNotification/pushNotificationActions'
import { toDateTime } from '@src/utils/functions'
import PushNotification, {
  PushNotificationKeys,
  PushNotificationStatus,
  SearchParam
} from '@src/models/application/pushNotification'
import Capsule from '../../components/Capsule'
import applicationMessages from '../../messages'
import { Status, capsuleStatusMap } from '../../constants'
import { BREADCRUMBS } from '../utils'
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
  const { pagination, handlePageChange, query } = usePaging({ total: notificationTotal })
  const { onCheckAll, handleCheck, checkedList, isChecked, isCheckAll, onResetCheck } = useCheckbox()
  const [param, setParam] = useState<Partial<SearchParam>>({})

  useEffect(() => {
    onGetPushNotificationList({ ...param, ...query })
    const subscription = successSubject.subscribe([PushNotificationActionType.DELETE_SUCCESS], () => {
      onResetCheck()
      onGetPushNotificationList({ ...param, ...query })
    })
    return () => subscription.unsubscribe()
  }, [onGetPushNotificationList, onResetCheck, query, param])

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
  const handleSearch = useCallback(
    data => {
      handlePageChange(null, 1)
      setParam(data)
    },
    [setParam, handlePageChange]
  )

  const handleDelete = useCallback(() => onDeletePushNotification(checkedList), [checkedList, onDeletePushNotification])

  const tableButtonList = useMemo(
    () => [<Button buttonText={formatMessage(commonMessages.delete)} icon={DeleteIcon} onClick={handleDelete} />],
    [handleDelete, formatMessage]
  )

  const listTableData = useMemo(
    () =>
      notificationList.map(notif => ({
        ...notif,
        classnames:
          notif[PushNotificationKeys.Message] === ''
            ? `${Status[capsuleStatusMap[notif[PushNotificationKeys.Status] as PushNotificationStatus]]}Row`
            : ''
      })),
    [notificationList]
  )

  const handleCheckAll = useCallback(() => {
    onCheckAll(listTableData)
  }, [onCheckAll, listTableData])

  const theadList = useMemo(
    () => [
      {
        id: 'checkbox',
        label: <StyledCheckBox value='' checked={isCheckAll} onCheck={handleCheckAll} />,
        padding: Padding.Checkbox,
        formatter: (_: any, { [PushNotificationKeys.Id]: id }: PushNotification) => (
          <StyledCheckBox value={id} checked={isChecked(id)} onCheck={handleCheck} />
        )
      },
      {
        id: PushNotificationKeys.Status,
        label: formatMessage(applicationMessages.status),
        formatter: (status: PushNotificationStatus) => <Capsule status={capsuleStatusMap[status]} />
      },
      { id: PushNotificationKeys.NotificationMessage, label: formatMessage(commonMessages.message) },
      { id: PushNotificationKeys.AppId, label: formatMessage(applicationMessages.applicationId) },
      { id: PushNotificationKeys.SendCount, label: formatMessage(messages.pushedTimes) },
      {
        id: PushNotificationKeys.DeliveryDateTime,
        label: formatMessage(commonMessages.deliveryDateTime),
        formatter: toDateTime
      },
      {
        id: PushNotificationKeys.Message,
        label: formatMessage(commonMessages.detail),
        formatter: (msg: string) => msg && <FormHelperText className='error'>{msg}</FormHelperText>
      }
    ],
    [formatMessage, handleCheckAll, isCheckAll, handleCheck, isChecked]
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
        onRowClick={useCallback(id => history.push(routePath.application.pushNotificationEdit.replace(':id', id)), [
          history
        ])}
      />
    </>
  )
}
