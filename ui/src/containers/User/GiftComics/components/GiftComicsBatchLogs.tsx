import React, { useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Grid, IconButton } from '@material-ui/core'
import { ReactComponent as DownloadIcon } from '@src/assets/common/download_circle.svg'
import { ReactComponent as AlertIcon } from '@src/assets/form/error_alert.svg'
import ContentHeader from '@src/components/ContentHeader'
import ListTable from '@src/components/table/ListTable'
import { usePaging, useSort } from '@src/hooks'
import GiftComicsContext, { ActionContext } from '../context/GiftComicsContext'
import { useCsvLogsStyles } from '../../utils'
import { BREADCRUMBS } from '../constants'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function GiftComicsBatchLogs() {
  const { formatMessage } = useIntl()
  const { csvLogList, csvLogTotal } = useContext(GiftComicsContext)
  const { onGetCsvLogList } = useContext(ActionContext)
  const { pagination, handlePageChange } = usePaging({ total: csvLogTotal })
  const { sortBy, handleSort } = useSort('create_data_time')
  const classes = useCsvLogsStyles()

  useEffect(() => {
    onGetCsvLogList()
  }, [onGetCsvLogList])

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
  const dataList = csvLogList
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
        classnames={classes.listTable}
        theadList={theadList}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
      />
    </>
  )
}
