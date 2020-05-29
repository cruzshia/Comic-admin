import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '@src/components/ContentHeader'
import { ReactComponent as EditIcon } from '@src/assets/common/pen.svg'
import { ReactComponent as CopyIcon } from '@src/assets/header/copy.svg'
import Button, { Theme } from '@src/components/Button/Button'
import { routePath } from '@src/common/appConfig'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import StickyHeader from '@src/components/StickyBar/StickyHeader'
import commonMessages from '@src/messages'
import CoinDeliveryEventContext, { ActionContext } from '../context/CoinDeliveryEventContext'
import { BREADCRUMBS } from '../constants'
import messages from '../messages'

export default function CoinDeliveryEventDetail() {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { id } = useParams()
  const { currentEvent = {} } = useContext(CoinDeliveryEventContext)
  const { onGetCoinDeliveryEvent, onResetCoinDeliveryEvent } = useContext(ActionContext)

  useEffect(() => {
    onGetCoinDeliveryEvent(id!)
    return () => onResetCoinDeliveryEvent()
  }, [onGetCoinDeliveryEvent, id, onResetCoinDeliveryEvent])

  const titleText = formatMessage(messages.detail)
  const breadcrumbList = useMemo(
    () =>
      BREADCRUMBS.map(({ title, route }) => ({ title: formatMessage(title), route })).concat([
        {
          title: titleText,
          route: undefined
        }
      ]),
    [formatMessage, titleText]
  )

  const handleEdit = useCallback(() => history.push(routePath.application.coinDeliveryEventEdit.replace(':id', id!)), [
    id,
    history
  ])

  const buttonList = useMemo(
    () => [
      <Button
        theme={Theme.DARK_BORDER}
        icon={EditIcon}
        buttonText={formatMessage(messages.editStart)}
        onClick={handleEdit}
      />,
      <Button buttonText={formatMessage(commonMessages.copy)} icon={CopyIcon} />
    ],
    [formatMessage, handleEdit]
  )

  if (!currentEvent.id) return null

  return (
    <>
      <StickyHeader title={titleText} button={buttonList} />
      <ContentHeader breadcrumbList={breadcrumbList} titleText={titleText} buttonList={buttonList} />
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
        title={formatMessage(commonMessages.releaseDuration)}
        dataSet={[
          toDataSet(formatMessage(commonMessages.publicStartTime), currentEvent.releaseStartAt),
          toDataSet(formatMessage(commonMessages.publicEndTime), currentEvent.releaseEndAt)
        ]}
        onEdit={handleEdit}
      />
    </>
  )
}
