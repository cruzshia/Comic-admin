import React, { useContext, useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import CsvImportLogTable from '@src/components/table/CsvImportLogTable'
import { DownloadBlock, FailedMsg } from '@src/components/styled'
import { useSort, usePaging } from '@src/hooks'
import commonMessages from '@src/messages'
import messages from '../messages'
import { BREADCRUMBS } from '../constants'
import WorkContext, { ActionContext } from '../context/WorkContext'

export default function WorkImportLogs() {
  const { formatMessage } = useIntl()
  const { importLogList, logTotal } = useContext(WorkContext)
  const { onGetCsvLogList } = useContext(ActionContext)
  const { sortBy, handleSort } = useSort('createAt')
  const { pagination, handlePageChange } = usePaging({ total: logTotal })

  useEffect(() => {
    onGetCsvLogList()
  }, [onGetCsvLogList])

  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat({
        title: formatMessage(messages.worksCsvImportLog),
        route: undefined
      }),
    [formatMessage]
  )

  const displayList = importLogList
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
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.worksCsvImportLog)} />
      <CsvImportLogTable
        onSort={handleSort}
        dataList={displayList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
      />
    </>
  )
}
