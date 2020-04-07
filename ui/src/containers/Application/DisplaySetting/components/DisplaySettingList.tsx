import React, { useMemo, useCallback, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import ListTable, { SortOrder, Padding } from '@src/components/table/ListTable'
import { StyledCheckBox } from '@src/components/form'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as DeleteIcon } from '@src/assets/common/delete.svg'
import { PAGE_LIMIT } from '@src/common/constants'
import { mainColor } from '@src/common/styles'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import DisplaySettingContext from '../context/DisplaySettingContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'
import SearchBlock from './SearchBlock'
import { Status } from '../constants'
import clsx from 'clsx'

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
    '& .reserved': {
      backgroundColor: '#F8FFEC'
    },
    '& .closed': {
      backgroundColor: '#EDEDED'
    }
  },
  status: {
    width: 80,
    lineHeight: '20px',
    borderRadius: '10px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    '&.opened': {
      backgroundColor: mainColor
    },
    '&.reserved': {
      backgroundColor: '#A2CD5A'
    },
    '&.closed': {
      backgroundColor: '#757575'
    }
  }
})

export default function DisplaySettingList() {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const { settingList, settingTotal } = useContext(DisplaySettingContext)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc)
  const [sortBy, setSortBy] = useState<any>('deliveryStartTime')
  const [page, setPage] = useState<number>(1)
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
          history.push(routePath.application.displaySettingCreation)
        }}
      />
    ],
    [formatMessage, history]
  )
  const handleSearch = useCallback(data => console.log(data), [])
  const pagination = useMemo(() => ({ total: settingTotal, start: (page - 1) * PAGE_LIMIT + 1 }), [page, settingTotal])
  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, page: number) => setPage(page), [setPage])

  const handleSort = useCallback(
    (id: string, order?: SortOrder) => {
      setSortOrder(order === SortOrder.Asc || id !== sortBy ? SortOrder.Desc : SortOrder.Asc)
      setSortBy(id as any)
    },
    [setSortOrder, setSortBy, sortBy]
  )

  const tableButtonList = useMemo(
    () => [
      <Button
        theme={Theme.LIGHT}
        buttonText={formatMessage(commonMessages.delete)}
        icon={DeleteIcon}
        onClick={() => {}}
      />
    ],
    [formatMessage]
  )

  const theadList = useMemo(
    () => [
      { id: 'checkbox', label: '', padding: Padding.Checkbox },
      { id: 'status', label: formatMessage(messages.status) },
      { id: 'display', label: formatMessage(messages.display) },
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
    [handleSort, formatMessage]
  )

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked) => {
      setCheckedList(preCheckedList => ({
        ...preCheckedList,
        [e.currentTarget.value]: checked
      }))
    },
    [setCheckedList]
  )

  const settingDataList = useMemo(
    () =>
      settingList
        .map(({ id, status, display, ...rest }) => ({
          id: id,
          classnames: Status[status as keyof typeof Status],
          data: {
            checkbox: <StyledCheckBox value={id} checked={!!checkedList[id]} onCheck={handleCheck} />,
            status: (
              <div className={clsx(classes.status, Status[status as keyof typeof Status])}>
                {formatMessage(applicationMessages[status as keyof typeof applicationMessages])}
              </div>
            ),
            display: formatMessage(messages[display as keyof typeof messages]),
            ...rest,
            spacer: ''
          }
        }))
        .sort((a: any, b: any) => {
          return (
            (new Date(a.data[sortBy]).getTime() - new Date(b.data[sortBy]).getTime()) *
            (sortOrder === SortOrder.Asc ? 1 : -1)
          )
        }),
    [sortBy, sortOrder, handleCheck, formatMessage, checkedList, settingList, classes.status]
  )

  const handleRowClick = useCallback(
    id => {
      history.push(routePath.application.displaySettingEdit.replace(':id', id))
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
        dataList={settingDataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        buttonList={tableButtonList}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onRowClick={handleRowClick}
      />
    </>
  )
}
