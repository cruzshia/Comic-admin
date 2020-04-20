import React, { useMemo, useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import Button, { Theme } from '@src/components/Button/Button'
import DataTable, { toDataSet, toPreWrapDataSet } from '@src/components/table/DataTable'
import { ReactComponent as IconEdit } from '@src/assets/form/button_edit.svg'
import commonMessages from '@src/messages'
import { routePath } from '@src/common/appConfig'
import SubscriptionContext from '../context/SubscriptionContext'
import messages from '../messages'
import { BREADCRUMBS } from '../utils'

export default function SubscriptionDetail() {
  const { currentSubscription } = useContext(SubscriptionContext)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({
        title: formatMessage(title),
        route
      })).concat([{ title: formatMessage(messages.subscriptionDetail), route: undefined }]),
    [formatMessage]
  )

  const handleEdit = useCallback(() => history.push(routePath.comics.subscriptionEdit.replace(':id', id!)), [
    history,
    id
  ])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={IconEdit}
        buttonText={formatMessage(messages.edit)}
        onClick={handleEdit}
      />
    ],
    [formatMessage, handleEdit]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.jumpSubscription)}
        buttonList={buttonList}
      />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentSubscription.id),
          toDataSet(formatMessage(messages.name), currentSubscription.magazine),
          toPreWrapDataSet(formatMessage(messages.monthlyFee), currentSubscription.monthlyFee),
          toDataSet(formatMessage(messages.subscriptionImage), <img src={currentSubscription.image} alt='' />),
          toDataSet(formatMessage(commonMessages.createDateTime), currentSubscription.createAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentSubscription.updateAt)
        ]}
        marginBottom
      />
      <DataTable
        title={formatMessage(commonMessages.deliveryDuration)}
        onEdit={handleEdit}
        dataSet={[
          toDataSet(formatMessage(commonMessages.deliveryStartDateTime), currentSubscription.deliverStart),
          toDataSet(formatMessage(commonMessages.deliveryEndDateTime), currentSubscription.deliverEnd)
        ]}
      />
    </>
  )
}
