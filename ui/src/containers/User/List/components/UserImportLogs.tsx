import React, { useMemo, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader'
import UserContext, { ActionContext } from '../context/UserContext'
import { BREADCRUMBS } from '../constants'
import { DownloadBlock } from '@src/components/styled'
import CsvImportLogTable, { DetailText } from '@src/components/table/CsvImportLogTable'
import { usePaging, useSort } from '@src/hooks'
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
    .map(item => ({
      ...item,
      filename: <DownloadBlock filename={item.filename} />,
      detail: <DetailText status={item.status} detail={item.detail} />
    }))
    .sort((a, b) => (Date.parse(a[sortBy.key]) - Date.parse(b[sortBy.key])) * sortBy.multiplier)

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
