import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'

export default function HistoryMagazineDetail({ currentHistory }: { currentHistory: any }) {
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
          title: formatMessage(messages.magazinePurchaseList),
          route: routePath.user.historyMagazine.replace(':userId', userId!)
        },
        {
          title: formatMessage(messages.magazinePurchaseDetail),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.magazinePurchase)} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.createDateTime), currentHistory.createdAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentHistory.updatedAt),
          toDataSet(formatMessage(userMessages.userId), currentHistory.userId),
          toDataSet(formatMessage(commonMessages.contentId), currentHistory.contentsId),
          toDataSet(formatMessage(commonMessages.subscriptionId), currentHistory.subscriptionId),
          toDataSet(formatMessage(commonMessages.appId), currentHistory.applicationId),
          toDataSet(formatMessage(messages.paidCoinCount), currentHistory.paidCoinCount),
          toDataSet(formatMessage(messages.paidGivenCoinCount), currentHistory.paidGivenCoinCount),
          toDataSet(formatMessage(messages.paidGiftCoinCount), currentHistory.paidGiftCoinCount),
          toDataSet(formatMessage(messages.supplementInfo), currentHistory.supplementInfo),
          toDataSet(formatMessage(messages.price), currentHistory.price),
          toDataSet(formatMessage(messages.currency), currentHistory.currency)
        ]}
      />
    </>
  )
}
