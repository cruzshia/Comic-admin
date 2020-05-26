import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import PushNotificationContext from '../context/PushNotificationContext'
import commonMessages from '@src/messages'
import messages from '../messages'

export default function PushNotificationDetail() {
  const { formatMessage } = useIntl()
  const { currentNotification } = useContext(PushNotificationContext)
  return (
    <>
      <DataTable
        dataSet={[
          toDataSet(formatMessage(commonMessages.id), currentNotification.id),
          toDataSet(formatMessage(commonMessages.title), currentNotification.title),
          toDataSet(formatMessage(commonMessages.message), currentNotification.message),
          toDataSet(formatMessage(commonMessages.application), currentNotification.applicationId),
          toDataSet(formatMessage(messages.deepLinkUrl), currentNotification.deepLinkUrl),
          toDataSet(formatMessage(messages.bigIconUrl), currentNotification.bigIconUrl)
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
