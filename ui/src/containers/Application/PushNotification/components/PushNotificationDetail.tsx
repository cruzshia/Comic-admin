import React, { useContext } from 'react'
import PushNotificationTable from './pushNotificationTable'
import PushNotificationContext from '../context/PushNotificationContext'

export default function PushNotificationDetail() {
  const { currentNotification } = useContext(PushNotificationContext)
  return <PushNotificationTable currentNotification={currentNotification} />
}
