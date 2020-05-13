import React, { useContext, useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import CsvImportLogTable from '@src/components/table/CsvImportLogTable'
import { DownloadBlock, FailedMsg } from '@src/components/styled'
import { useSort, usePaging } from '@src/hooks'
import { CONTENT_BREADCRUMBS } from '../constants'
import ContentContext from '../context/ContentContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function ContentImportLogs() {
  const { importLogList, logTotal } = useContext(ContentContext)
  const { formatMessage } = useIntl()
  const { sortBy, handleSort } = useSort('createAt')
  const { pagination, handlePageChange } = usePaging({ total: logTotal })

  const titleText = formatMessage(messages.csvImportLog)
  const breadcrumbList = useMemo(
    () =>
      CONTENT_BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: titleText, route: undefined }]),
    [formatMessage, titleText]
  )

  const dataList = importLogList
    .map(({ id, ...log }) => ({
      id,
      data: {
        ...log,
        filename: <DownloadBlock filename={log.filename} />,
        detail:
          log.status === 'failure' ? <FailedMsg msg={formatMessage(commonMessages.errorAsyncFailed)} /> : log.detail
      }
    }))
    .sort(
      (a, b) => (new Date(a.data[sortBy.key]).getTime() - new Date(b.data[sortBy.key]).getTime()) * sortBy.multiplier
    )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <CsvImportLogTable
        onSort={handleSort}
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
      />
    </>
  )
}
