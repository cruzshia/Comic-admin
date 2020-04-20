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

export default function HistoryBonusCoinDetail({ currentHistory }: { currentHistory: any }) {
  const { formatMessage } = useIntl()
  const { userId } = useParams()
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId!) },
        {
          title: formatMessage(messages.bonusCoin),
          route: routePath.user.historyBonusCoin.replace(':userId', userId!)
        },
        {
          title: formatMessage(messages.bonusCoinDetail),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.bonusCoin)} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.createDateTime), currentHistory.createdAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentHistory.updatedAt),
          toDataSet(formatMessage(userMessages.userId), currentHistory.userId),
          toDataSet(formatMessage(messages.contentsCampaignId), currentHistory.contentsCampaignId),
          toDataSet(formatMessage(messages.customEventId), currentHistory.customEventId),
          toDataSet(formatMessage(messages.customEventPaymentId), currentHistory.customEventPaymentId),
          toDataSet(formatMessage(messages.logType), currentHistory.logType),
          toDataSet(formatMessage(commonMessages.appId), currentHistory.applicationId),
          toDataSet(formatMessage(messages.bonusCoinCount), currentHistory.bonusCoinCount),
          toDataSet(formatMessage(messages.adCoinCount), currentHistory.adCoinCount),
          toDataSet(formatMessage(messages.videoAdCoinCount), currentHistory.videoAdCoinCount)
        ]}
      />
    </>
  )
}
