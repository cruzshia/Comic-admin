import { createContext } from 'react'

interface NotificationContext {
  notificationList: any[]
  notificationTotal: number
}

export default createContext<NotificationContext>({
  notificationList: [],
  notificationTotal: 0
})
