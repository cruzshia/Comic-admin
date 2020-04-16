import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'

export default function InquiryDetail({ inquiry }: { inquiry: any }) {
  const { formatMessage } = useIntl()
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat({ title: formatMessage(messages.detail), route: undefined }),
    [formatMessage]
  )

  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.detail)} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), inquiry.id),
          toDataSet(formatMessage(userMessages.userId), inquiry.userId),
          toDataSet(formatMessage(messages.inquiryType), inquiry.inquiryType),
          toDataSet(formatMessage(messages.appVersion), inquiry.appVersion),
          toPreWrapDataSet(formatMessage(messages.message), inquiry.message),
          toPreWrapDataSet(formatMessage(messages.inquiryTime), inquiry.inquiryAt)
        ]}
      />
    </>
  )
}
