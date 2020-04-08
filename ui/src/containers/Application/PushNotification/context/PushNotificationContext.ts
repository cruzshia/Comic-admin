import { createContext } from 'react'

interface PushNotificationContext {
  notificationList: any[]
  currentNotification?: any
  notificationTotal: number
}

export default createContext<PushNotificationContext>({
  notificationList: [],
  notificationTotal: 0
})
