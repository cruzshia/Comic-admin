import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'

export default function HistorySubscriptionDetail({ currentHistory }: { currentHistory: any }) {
  const { formatMessage } = useIntl()
  const { userId } = useParams()
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId || '') },
        {
          title: formatMessage(messages.subscriptionList),
          route: routePath.user.historySubscription.replace(':userId', userId || '')
        },
        {
          title: formatMessage(messages.subscriptionDetail),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.subscription)} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.createDateTime), currentHistory.createdAt),
          toDataSet(formatMessage(userMessages.userId), currentHistory.userId),
          toDataSet(formatMessage(messages.subscriptionId), currentHistory.subscriptionId),
          toDataSet(formatMessage(commonMessages.appId), currentHistory.applicationId),
          toDataSet(formatMessage(messages.price), currentHistory.price),
          toDataSet(formatMessage(messages.currency), currentHistory.currency),
          toDataSet(formatMessage(messages.subscriptionStartAt), currentHistory.startAt),
          toDataSet(formatMessage(messages.subscriptionUpdatedAt), currentHistory.updatedAt),
          toDataSet(formatMessage(messages.subscriptionValidityPeriod), currentHistory.validityPeriod)
        ]}
      />
    </>
  )
}
