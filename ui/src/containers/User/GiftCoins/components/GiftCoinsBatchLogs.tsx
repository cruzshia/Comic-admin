import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Grid, IconButton } from '@material-ui/core'
import { ReactComponent as DownloadIcon } from '@src/assets/common/download_circle.svg'
import { ReactComponent as AlertIcon } from '@src/assets/form/error_alert.svg'
import { usePaging, useSort } from '@src/hooks'
import ContentHeader from '@src/components/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import { BREADCRUMBS } from '../constants'
import { useCsvLogsStyles } from '../../utils'
import { mockList } from '@src/epics/user/giftCoins/mockData/mock'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function GiftCoinsBatchLogs() {
  const classes = useCsvLogsStyles()
  const { formatMessage } = useIntl()
  const { pagination, handlePageChange } = usePaging({ total: mockList.length })
  const { sortBy, handleSort } = useSort('create_data_time')

  const titleText = formatMessage(messages.csvBatchGiftLogs)
  const breadcrumbList = BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  })).concat([{ title: titleText, route: undefined }])

  const theadList = useMemo(
    () => [
      {
        id: 'create_data_time',
        label: formatMessage(commonMessages.createDateTime),
        onSort: handleSort
      },
      { id: 'scheduled_date_time', label: formatMessage(commonMessages.scheduledDateTime) },
      { id: 'start_date_time', label: formatMessage(commonMessages.startDateTime) },
      { id: 'update_date_time', label: formatMessage(commonMessages.updateDateTime) },
      { id: 'filename', label: formatMessage(commonMessages.filename) },
      { id: 'status', label: formatMessage(commonMessages.status) },
      { id: 'detail', label: formatMessage(commonMessages.detail) }
    ],
    [handleSort, formatMessage]
  )
  const dataList = mockList
    .map(({ id, ...rest }) => ({
      id,
      data: {
        ...rest,
        fileName: (
          <Grid container alignItems='center' className={classes.fileName}>
            {rest.fileName}
            <IconButton size='small'>
              <DownloadIcon />
            </IconButton>
          </Grid>
        ),
        detail:
          rest.status === 'failure' ? (
            <Grid container alignItems='center' className={classes.error}>
              <AlertIcon />
              {formatMessage(commonMessages.errorAsyncFailed)}
            </Grid>
          ) : (
            rest.detail
          )
      }
    }))
    .sort((a, b) => (Date.parse(a.data.createDateTime) - Date.parse(b.data.createDateTime)) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <ListTable
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        classnames={classes.listTable}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
      />
    </>
  )
}
