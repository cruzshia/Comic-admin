import React, { useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import NotificationContext from '../context/NotificationContext'
import ContentHeader from '@src/components/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import Button, { Theme } from '@src/components/Button/Button'
import { usePaging, useSort } from '@src/hooks'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import SearchBlock from './SearchBlock'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

const useStyles = makeStyles({
  listTable: {
    '& .MuiGrid-root': {
      marginTop: '35px'
    },
    '& .ListTable-col-1': {
      width: 150
    },
    '& .ListTable-col-2, .ListTable-col-3': {
      width: 260
    },
    '& .ListTable-col-4': {
      width: 200
    },
    '& .ListTable-col-5,& .ListTable-col-6': {
      width: 160
    }
  }
})

export default function NotificationList() {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  const history = useHistory()
  const { notificationTotal, notificationList } = useContext(NotificationContext)
  const { sortBy, handleSort } = useSort('createDateTime')
  const { pagination, handlePageChange } = usePaging({ total: notificationTotal })

  const breadcrumbList = BREADCRUMBS.map(({ title }) => ({ title: formatMessage(title) }))
  const buttonList = [
    <Button theme={Theme.DARK_BORDER} buttonText={formatMessage(messages.startCreate)} icon={IconEdit} />
  ]

  const handleSearch = useCallback((data: any) => {}, [])

  const theadList = [
    { id: 'createDateTime', label: formatMessage(commonMessages.createDateTime), onSort: handleSort },
    { id: 'title', label: formatMessage(commonMessages.title) },
    { id: 'id', label: formatMessage(commonMessages.id) },
    { id: 'application', label: formatMessage(commonMessages.application) },
    { id: 'releaseStartDate', label: formatMessage(messages.releaseStartDate), onSort: handleSort },
    { id: 'releaseEndDate', label: formatMessage(messages.releaseEndDate) }
  ]
  const displayData = notificationList
    .map((data, idx) => ({
      id: `notification-${idx}`,
      data
    }))
    .sort((a, b) => (Date.parse(a.data[sortBy.key]) - Date.parse(b.data[sortBy.key])) * sortBy.multiplier)
  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.notificationList)}
        buttonList={buttonList}
      />
      <SearchBlock onSubmit={handleSearch} />
      <ListTable
        classnames={classes.listTable}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        theadList={theadList}
        dataList={displayData}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowClick={id => {
          history.push(routePath.user.notificationDetail.replace(':id', id))
        }}
      />
    </>
  )
}
