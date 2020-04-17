import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '../../messages'
import messages from '../messages'
import DataTable, { toDataSet } from '@src/components/table/DataTable'

export default function HistoryEpisodeDetail({ currentHistory }: { currentHistory: any }) {
  const { formatMessage } = useIntl()
  const { userId } = useParams()
  const formatCoinCount = (num: number) => formatMessage(userMessages.amountOfCoins, { num })

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId || '') },
        {
          title: formatMessage(messages.episodePurchaseList),
          route: routePath.user.historyEpisode.replace(':userId', userId || '')
        },
        {
          title: formatMessage(messages.episodePurchaseDetail),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.episodePurchase)} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.createDateTime), currentHistory.createdAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentHistory.updatedAt),
          toDataSet(formatMessage(userMessages.userId), currentHistory.userId),
          toDataSet(formatMessage(commonMessages.contentId), currentHistory.contentsId),
          toDataSet(formatMessage(commonMessages.appId), currentHistory.applicationId),
          toDataSet(formatMessage(messages.coinCount), formatCoinCount(currentHistory.coinCount)),
          toDataSet(formatMessage(messages.payCoinCount), formatCoinCount(currentHistory.paidCoinCount)),
          toDataSet(formatMessage(messages.payBonusCoinCount), formatCoinCount(currentHistory.givenCoinCount)),
          toDataSet(formatMessage(messages.payGiftCoinCount), formatCoinCount(currentHistory.giftCoinCount)),
          toDataSet(formatMessage(messages.bonusCoinCount), formatCoinCount(currentHistory.bonusCoinCount)),
          toDataSet(formatMessage(messages.adCoinCount), formatCoinCount(currentHistory.adCoinCount)),
          toDataSet(formatMessage(messages.freeVideoAdCoinCount), formatCoinCount(currentHistory.freeVideoAdCoinCount))
        ]}
      />
    </>
  )
}
