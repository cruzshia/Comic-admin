import React, { useContext, useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import CsvImportLogTable from '@src/components/table/CsvImportLogTable'
import { DownloadBlock, FailedMsg } from '@src/components/styled'
import { usePaging } from '@src/hooks'
import commonMessages from '@src/messages'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'
import WorkContext, { ActionContext } from '../context/WorkContext'

export default function WorkImportLogs() {
  const { formatMessage } = useIntl()
  const { importLogList, logTotal } = useContext(WorkContext)
  const { onGetCsvLogList } = useContext(ActionContext)
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

  const displayList = importLogList.map(({ id, ...log }) => ({
    id,
    data: {
      ...log,
      filename: <DownloadBlock filename={log.filename} />,
      detail: log.status === 'failure' ? <FailedMsg msg={formatMessage(commonMessages.errorAsyncFailed)} /> : log.detail
    }
  }))

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.worksCsvImportLog)} />
      <CsvImportLogTable dataList={displayList} pagination={pagination} onPageChange={handlePageChange} />
    </>
  )
}
