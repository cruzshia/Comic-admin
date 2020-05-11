import React, { useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader/ContentHeader'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import Inquiry from '@src/models/user/inquiry'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'

interface Props {
  inquiry: Inquiry
  onGetInquiry: (id: string) => void
  onResetInquiry: () => void
}

export default function InquiryDetail({ inquiry = {}, onGetInquiry, onResetInquiry }: Props) {
  const { formatMessage } = useIntl()
  const { id } = useParams()

  useEffect(() => {
    onGetInquiry(id!)
    return () => onResetInquiry()
  }, [onGetInquiry, id, onResetInquiry])

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
          toDataSet(formatMessage(messages.inquiryType), inquiry.inquiryType),
          toPreWrapDataSet(formatMessage(messages.message), inquiry.message),
          toPreWrapDataSet(formatMessage(messages.name), inquiry.name),
          toDataSet(formatMessage(userMessages.userId), inquiry.userId),
          toDataSet(formatMessage(commonMessages.appId), inquiry.appId),
          toDataSet(formatMessage(messages.appVersion), inquiry.appVersion),
          toPreWrapDataSet(formatMessage(messages.inquiryTime), inquiry.inquiryAt)
        ]}
      />
    </>
  )
}
