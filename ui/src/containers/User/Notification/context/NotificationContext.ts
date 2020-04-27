import { createContext } from 'react'
import Notification from '@src/models/user/notification'

interface NotificationContext {
  notificationList: any[]
  notificationTotal: number
  currentNotification?: any
}

export default createContext<NotificationContext>({
  notificationList: [],
  notificationTotal: 0
})

interface ActionContext {
  onGetNotificationList: () => void
  onGetNotification: (id: string) => void
  onCreateNotification: (data: Notification) => void
  onResetNotification: () => void
}

export const ActionContext = createContext<ActionContext>({
  onGetNotificationList: () => {},
  onGetNotification: (_: string) => {},
  onCreateNotification: (_: Notification) => {},
  onResetNotification: () => {}
})
