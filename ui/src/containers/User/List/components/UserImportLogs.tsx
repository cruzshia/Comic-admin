import React, { useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import UserContext, { ActionContext } from '../context/UserContext'
import { BREADCRUMBS } from '../constants'
import { DownloadBlock, FailedMsg } from '@src/components/styled'
import CsvImportLogTable from '@src/components/table/CsvImportLogTable'
import { usePaging, useSort } from '@src/hooks'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function UserImportLogs() {
  const { formatMessage } = useIntl()
  const { csvImportLogs, csvImportLogsTotal } = useContext(UserContext)
  const { onGetUserImportLogList } = useContext(ActionContext)
  const { pagination, handlePageChange } = usePaging({ total: csvImportLogsTotal })
  const { sortBy, handleSort } = useSort('createAt')

  useEffect(() => {
    onGetUserImportLogList()
  }, [onGetUserImportLogList])

  const titleText = formatMessage(messages.userCsvImportLogs)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: titleText,
          route: undefined
        }
      ]),
    [formatMessage, titleText]
  )
  const dataList = csvImportLogs
    .map(({ id, ...res }) => ({
      id,
      data: {
        ...res,
        filename: <DownloadBlock filename={res.filename} />,
        detail:
          res.status === 'failure' ? <FailedMsg msg={formatMessage(commonMessages.errorAsyncFailed)} /> : res.detail
      } as any
    }))
    .sort((a, b) => (Date.parse(a.data[sortBy.key]) - Date.parse(b.data[sortBy.key])) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <CsvImportLogTable
        sortBy={sortBy.key}
        onSort={handleSort}
        dataList={dataList}
        onPageChange={handlePageChange}
        sortOrder={sortBy.order}
        pagination={pagination}
      />
    </>
  )
}
