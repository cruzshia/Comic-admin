import React, { useMemo, useCallback, useContext, useState } from 'react'
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
import usePaging from '@src/hooks/usePaging'
import useSort from '@src/hooks/useSort'
import commonMessages from '@src/messages'
import Capsule from '../../components/Capsule'
import applicationMessages from '../../messages'
import { Status } from '../../constants'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import SearchBlock from './SearchBlock'
import PushNotificationContext from '../context/PushNotificationContext'

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
  const { sortBy, handleSort } = useSort<string>('deliveryStartTime')
  const { pagination, handlePageChange } = usePaging({ total: notificationTotal })
  const [checkedList, setCheckedList] = useState<{ [key: string]: boolean }>({})

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

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked) => {
      setCheckedList(preCheckedList => ({
        ...preCheckedList,
        [e.currentTarget.value]: checked
      }))
    },
    [setCheckedList]
  )

  const tableButtonList = useMemo(
    () => [<Button buttonText={formatMessage(commonMessages.delete)} icon={DeleteIcon} onClick={() => {}} />],
    [formatMessage]
  )
  const listTableData = useMemo(
    () =>
      notificationList
        .map(({ id, status, detail, ...rest }) => ({
          id: id,
          classnames: detail ? '' : `${Status[status as keyof typeof Status]}Row`,
          data: {
            checkbox: <StyledCheckBox value={id} checked={!!checkedList[id]} onCheck={handleCheck} />,
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
    [notificationList, checkedList, handleCheck, sortBy.key, sortBy.order]
  )

  const theadList = useMemo(
    () => [
      { id: 'checkbox', label: '', padding: Padding.Checkbox },
      { id: 'status', label: formatMessage(commonMessages.status) },
      { id: 'message', label: formatMessage(messages.message) },
      { id: 'applicationId', label: formatMessage(applicationMessages.applicationId) },
      { id: 'timesPushed', label: formatMessage(messages.pushedTimes) },
      {
        id: 'deliveryStartTime',
        label: formatMessage(commonMessages.deliveryStartDateTime),
        onSort: handleSort
      },
      { id: 'detail', label: formatMessage(commonMessages.detail) }
    ],
    [handleSort, formatMessage]
  )

  const handleRowClick = useCallback(
    id => {
      history.push(routePath.application.pushNotificationEdit.replace(':id', id))
    },
    [history]
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
        onRowClick={handleRowClick}
      />
    </>
  )
}
