import React, { useMemo, useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { routePath } from '@src/common/appConfig'
import ContentHeader from '@src/components/ContentHeader'
import HistorySubscription from '@src/models/user/historySubscription'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import Button from '@src/components/Button/Button'
import { ReactComponent as DeleteIcon } from '@src/assets/common/delete.svg'
import { BREADCRUMBS } from '../utils'
import commonMessages from '@src/messages'
import userMessages from '@src/containers/User/messages'
import messages from '../messages'

interface Props {
  currentSubscription?: HistorySubscription
  onGetSubscription: (id: string) => void
  onDeleteSubscription: (id: string) => void
  onResetSubscription: () => void
}

export default function HistorySubscriptionDetail({
  currentSubscription = {},
  onGetSubscription,
  onDeleteSubscription,
  onResetSubscription
}: Props) {
  const { formatMessage } = useIntl()
  const { userId, id } = useParams()

  useEffect(() => {
    onGetSubscription(id!)
    return () => onResetSubscription()
  }, [onResetSubscription, onGetSubscription, id])

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
          title: formatMessage(messages.subscriptionList),
          route: routePath.user.historySubscription.replace(':userId', userId!)
        },
        {
          title: formatMessage(messages.subscriptionDetail),
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
        titleText={formatMessage(messages.subscription)}
        buttonList={deleteButton}
      />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.createDateTime), currentSubscription.createdAt),
          toDataSet(formatMessage(userMessages.userId), currentSubscription.userId),
          toDataSet(formatMessage(commonMessages.subscriptionId), currentSubscription.subscriptionId),
          toDataSet(formatMessage(commonMessages.subscriptionName), currentSubscription.subscriptionName),
          toDataSet(formatMessage(commonMessages.appId), currentSubscription.applicationId),
          toDataSet(formatMessage(messages.price), currentSubscription.price),
          toDataSet(formatMessage(messages.currency), currentSubscription.currency),
          toDataSet(formatMessage(messages.subscriptionStartAt), currentSubscription.startAt),
          toDataSet(formatMessage(messages.subscriptionUpdatedAt), currentSubscription.updatedAt),
          toDataSet(formatMessage(messages.subscriptionValidityPeriod), currentSubscription.validityPeriod)
        ]}
      />
    </>
  )
}
