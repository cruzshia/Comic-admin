import { createContext } from 'react'

interface NotificationContext {
  notificationList: any[]
  notificationTotal: number
  currentNotification?: any
}

export default createContext<NotificationContext>({
  notificationList: [],
  notificationTotal: 0
})
