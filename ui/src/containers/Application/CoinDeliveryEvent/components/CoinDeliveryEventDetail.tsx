import React, { useMemo, useContext, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import commonMessages from '@src/messages'
import applicationMessages from '../../messages'
import CoinDeliveryEventContext from '../context/CoinDeliveryEventContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function CoinDeliveryEventDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const { currentEvent } = useContext(CoinDeliveryEventContext)

  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: formatMessage(messages.detail),
          route: undefined
        }
      ]),
    [formatMessage]
  )

  const handleEdit = useCallback(() => history.push(routePath.application.coinProductEdit.replace(':id', id!)), [
    id,
    history
  ])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.edit)}
        onClick={handleEdit}
      />,
      <Button buttonText={formatMessage(commonMessages.copy)} icon={CopyIcon} />
    ],
    [formatMessage, handleEdit]
  )

  return (
    <>
      <ContentHeader
        breadcrumbList={breadcrumbList}
        titleText={formatMessage(messages.detail)}
        buttonList={buttonList}
      />
      <DataTable
        title={formatMessage(commonMessages.basicInfo)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentEvent.id),
          toDataSet(formatMessage(messages.eventId), currentEvent.eventId),
          toDataSet(formatMessage(messages.eventName), currentEvent.eventName),
          toDataSet(formatMessage(messages.eventType), currentEvent.eventType),
          toDataSet(formatMessage(messages.eventRewardSetting), currentEvent.eventRewardSetting),
          toDataSet(formatMessage(commonMessages.createDateTime), currentEvent.createdAt),
          toDataSet(formatMessage(commonMessages.updateDateTime), currentEvent.updatedAt)
        ]}
        marginBottom
        onEdit={handleEdit}
      />
      <DataTable
        title={formatMessage(applicationMessages.releaseDuration)}
        dataSet={[
          toDataSet(formatMessage(applicationMessages.releaseStartTime), currentEvent.releaseStartAt),
          toDataSet(formatMessage(applicationMessages.releaseEndTime), currentEvent.releaseEndAt)
        ]}
        onEdit={handleEdit}
      />
    </>
  )
}
