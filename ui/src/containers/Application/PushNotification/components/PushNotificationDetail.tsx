import React, { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { PushNotificationKeys } from '@src/models/application/pushNotification'
import PushNotificationContext, { ActionContext } from '../context/PushNotificationContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function PushNotificationDetail() {
  const { formatMessage } = useIntl()
  const { currentNotification = {} } = useContext(PushNotificationContext)
  const { onGetPushNotification } = useContext(ActionContext)
  const { id } = useParams()

  useEffect(() => {
    onGetPushNotification(id!)
  }, [onGetPushNotification, id])

  return (
    <>
      <DataTable
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentNotification[PushNotificationKeys.Id]),
          toDataSet(formatMessage(commonMessages.title), currentNotification[PushNotificationKeys.Title]),
          toDataSet(
            formatMessage(commonMessages.message),
            currentNotification[PushNotificationKeys.NotificationMessage]
          ),
          toDataSet(formatMessage(commonMessages.application), currentNotification[PushNotificationKeys.AppId]),
          toDataSet(formatMessage(messages.deepLinkUrl), currentNotification[PushNotificationKeys.DeepLinkUrl]),
          toDataSet(formatMessage(messages.bigIconUrl), currentNotification[PushNotificationKeys.LargeIconUrl])
        ]}
        title={formatMessage(commonMessages.basicInfo)}
        marginBottom
      />
      <DataTable
        dataSet={[toDataSet(formatMessage(commonMessages.deliveryDateTime), currentNotification.scheduledStartTime)]}
        title={formatMessage(commonMessages.schedule)}
      />
    </>
  )
}
