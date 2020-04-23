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

interface PushNotificationActionContext {
  onGetPushNotificationList: () => void
  onDeletePushNotification: (list: string[]) => void
}

export const ActionContext = createContext<PushNotificationActionContext>({
  onGetPushNotificationList: () => {},
  onDeletePushNotification: list => {}
})
