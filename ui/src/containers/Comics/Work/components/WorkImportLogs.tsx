import React, { useContext, useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles, Grid, IconButton } from '@material-ui/core'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import ListTable, { SortOrder } from '@src/components/table/ListTable'
import { errorColor, fontWeightBold } from '@src/common/styles'
import { ReactComponent as AlertIcon } from '@src/assets/form/error_alert.svg'
import { ReactComponent as DownloadIcon } from '@src/assets/common/download_circle.svg'
import messages from '@src/messages'
import { BREADCRUMBS } from '../constants'
import WorkContext from '../context/WorkContext'

const useStyle = makeStyles({
  table: {
    marginTop: '-55px',
    '& .ListTable-col-3': {
      width: '23%'
    },
    '& .ListTable-col-4': {
      width: 70
    },
    '& .ListTable-col-5': {
      width: '44%'
    },
    '& .download-icon': {
      marginLeft: '5px'
    }
  },
  error: {
    color: errorColor,
    fontWeight: fontWeightBold,
    '& .alert-icon': {
      marginRight: '6px'
    }
  }
})

const WORK_SORT_KEY = 'createAt'

export default function WorkImportLogs() {
  const classes = useStyle()
  const { formatMessage } = useIntl()
  const { importLogList, logTotal } = useContext(WorkContext)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc)
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat({
        title: formatMessage(messages.csvImport),
        route: undefined
      }),
    [formatMessage]
  )

  const theadList = useMemo(
    () => [
      {
        id: 'createAt',
        label: formatMessage(messages.createDateTime),
        onSort: () => setSortOrder(sortOrder => (sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc))
      },
      { id: 'updateAt', label: formatMessage(messages.updateDateTime) },
      { id: 'filename', label: formatMessage(messages.filename) },
      { id: 'status', label: formatMessage(messages.status) },
      { id: 'detail', label: formatMessage(messages.detail) }
    ],
    [setSortOrder, formatMessage]
  )

  const displayList = importLogList
    .map(log => ({
      id: log.id,
      data: {
        createAt: log.createAt,
        updateAt: log.updateAt,
        filename: (
          <Grid container alignItems='center'>
            {log.filename}
            <IconButton className='download-icon' size='small'>
              <DownloadIcon />
            </IconButton>
          </Grid>
        ),
        status: log.status,
        detail:
          log.status === 'failure' ? (
            <Grid container alignItems='center' className={classes.error}>
              <AlertIcon className='alert-icon' />
              {formatMessage(messages.errorAsyncFailed)}
            </Grid>
          ) : (
            log.detail
          )
      }
    }))
    .sort(
      (a, b) =>
        (new Date(a.data[WORK_SORT_KEY]).getTime() - new Date(b.data[WORK_SORT_KEY]).getTime()) *
        (sortOrder === SortOrder.Asc ? 1 : -1)
    )

  const handlePageClick = useCallback(() => {}, [])
  const pagination = useMemo(
    () => ({
      start: 1,
      total: logTotal
    }),
    [logTotal]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.csvImport)} />
      <ListTable
        classnames={classes.table}
        theadList={theadList}
        dataList={displayList}
        pagination={pagination}
        onPageChange={handlePageClick}
        sortBy={WORK_SORT_KEY}
        sortOrder={sortOrder}
      />
    </>
  )
}
