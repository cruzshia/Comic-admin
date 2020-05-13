import React, { useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import HistoryPayCoin from '@src/models/user/historyPayCoin'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'

interface Props {
  currentHistory: HistoryPayCoin
  onGetHistoryPayCoin: (id: string) => void
  onResetHistoryPayCoin: () => void
}

export default function HistoryPayCoinDetail({
  currentHistory = {},
  onGetHistoryPayCoin,
  onResetHistoryPayCoin
}: Props) {
  const { formatMessage } = useIntl()
  const { userId, id } = useParams()

  useEffect(() => {
    onGetHistoryPayCoin(id!)
    return () => onResetHistoryPayCoin()
  }, [onGetHistoryPayCoin, onResetHistoryPayCoin, id])

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([
        { title: formatMessage(userMessages.detail), route: routePath.user.userDetail.replace(':id', userId!) },
        {
          title: formatMessage(messages.payCoinList),
          route: routePath.user.historyPayCoin.replace(':userId', userId!)
        },
        {
          title: formatMessage(messages.payCoinDetail),
          route: undefined
        }
      ]),
    [formatMessage, userId]
  )
  return (
    <>
      <ContentHeader breadcrumbList={breadcrumbList} titleText={formatMessage(messages.payCoin)} />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.createDateTime), currentHistory.createdAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentHistory.updatedAt),
          toDataSet(formatMessage(userMessages.userId), currentHistory.userId),
          toDataSet(formatMessage(messages.logType), currentHistory.logType),
          toDataSet(formatMessage(commonMessages.application), currentHistory.application),
          toDataSet(formatMessage(messages.payCoinCount), currentHistory.payCoinCount),
          toDataSet(formatMessage(messages.payBonusCoinCount), currentHistory.payBonusCoinCount),
          toDataSet(formatMessage(messages.payGiftCoinCount), currentHistory.payGiftCoinCount),
          toDataSet(formatMessage(messages.supplementInfo), currentHistory.supplementInfo)
        ]}
      />
    </>
  )
}
