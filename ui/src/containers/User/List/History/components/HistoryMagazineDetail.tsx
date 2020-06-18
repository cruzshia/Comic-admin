import React, { useMemo, useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import Button from '@src/components/Button/Button'
import { ReactComponent as DeleteIcon } from '@src/assets/common/delete.svg'
import HistoryMagazine from '@src/models/user/historyMagazine'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'

interface Props {
  currentHistory: HistoryMagazine
  onGetHistoryMagazine: (id: string) => void
  onDeleteSubscription: (id: string) => void
  onResetHistoryMagazine: () => void
}

export default function HistoryMagazineDetail({
  currentHistory = {},
  onGetHistoryMagazine,
  onDeleteSubscription,
  onResetHistoryMagazine
}: Props) {
  const { formatMessage } = useIntl()
  const { userId, id } = useParams()

  useEffect(() => {
    onGetHistoryMagazine(id!)
    return () => onResetHistoryMagazine()
  }, [onResetHistoryMagazine, onGetHistoryMagazine, id])

  const handleDelete = useCallback(() => {
    onDeleteSubscription(id!)
  }, [onDeleteSubscription, id])

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

  const deleteButton = useMemo(
    () => [<Button buttonText={formatMessage(commonMessages.delete)} icon={DeleteIcon} onClick={handleDelete} />],
    [formatMessage, handleDelete]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.magazinePurchase)}
        buttonList={deleteButton}
      />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.createDateTime), currentHistory.createdAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentHistory.updatedAt),
          toDataSet(formatMessage(userMessages.userId), currentHistory.userId),
          toDataSet(formatMessage(commonMessages.contentId), currentHistory.contentsId),
          toDataSet(formatMessage(commonMessages.contentName), currentHistory.contentName),
          toDataSet(formatMessage(commonMessages.subscriptionId), currentHistory.subscriptionId),
          toDataSet(formatMessage(commonMessages.subscriptionName), currentHistory.subscriptionName),
          toDataSet(formatMessage(commonMessages.appId), currentHistory.applicationId),
          toDataSet(formatMessage(messages.payCoinCount), currentHistory.paidCoinCount),
          toDataSet(formatMessage(messages.payBonusCoinCount), currentHistory.paidGivenCoinCount),
          toDataSet(formatMessage(messages.payGiftCoinCount), currentHistory.paidGiftCoinCount),
          toDataSet(formatMessage(messages.supplementInfo), currentHistory.supplementInfo)
        ]}
      />
    </>
  )
}
