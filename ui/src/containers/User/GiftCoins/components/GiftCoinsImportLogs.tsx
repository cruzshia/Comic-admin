import React, { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { usePaging, useSort } from '@src/hooks'
import ContentHeader from '@src/components/ContentHeader'
import { DownloadBlock } from '@src/components/styled'
import CsvImportLogTable, { DetailText } from '@src/components/table/CsvImportLogTable'
import GiftCoinsContext, { ActionContext } from '../context/GiftCoinsContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function GiftCoinsImportLogs() {
  const { csvLogList, csvLogTotal } = useContext(GiftCoinsContext)
  const { onGetCsvLogList } = useContext(ActionContext)
  const { formatMessage } = useIntl()
  const { pagination, handlePageChange } = usePaging({ total: csvLogTotal })
  const { sortBy, handleSort } = useSort('createAt')

  useEffect(() => {
    onGetCsvLogList()
  }, [onGetCsvLogList])

  const titleText = formatMessage(messages.csvBatchGiftLogs)
  const breadcrumbList = BREADCRUMBS.map(({ title, route }) => ({
    title: formatMessage(title),
    route
  })).concat([{ title: titleText, route: undefined }])

  const dataList = csvLogList
    .map(log => ({
      ...log,
      filename: <DownloadBlock filename={log.filename} />,
      detail: <DetailText status={log.status} detail={log.detail} />
    }))
    .sort((a, b) => (Date.parse(a[sortBy.key]) - Date.parse(b[sortBy.key])) * sortBy.multiplier)

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} />
      <CsvImportLogTable
        dataList={dataList}
        pagination={pagination}
        onPageChange={handlePageChange}
        sortBy={sortBy.key}
        sortOrder={sortBy.order}
        onSort={handleSort}
      />
    </>
  )
}
