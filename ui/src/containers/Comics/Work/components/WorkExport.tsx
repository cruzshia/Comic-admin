import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader, { Breadcrumb } from '@src/components/ContentHeader/ContentHeader'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'

export default function WorkExport() {
  const { formatMessage } = useIntl()
  const breadcrumbList: Breadcrumb[] = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: formatMessage(commonMessages.csvExportLogs), route: undefined }),
    [formatMessage]
  )
  return <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(commonMessages.csvExportLogs)} />
}
