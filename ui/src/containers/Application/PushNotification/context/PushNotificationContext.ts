import { createContext } from 'react'
import { PushNotification } from '@src/models/application/pushNotification'

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
  onDeletePushNotification: (_: string[]) => void
  onCreatePushNotification: (_: Omit<PushNotification, 'id'>) => void
  onGetPushNotification: (_: string) => void
  onUpdatePushNotification: (_: PushNotification) => void
}

export const ActionContext = createContext<PushNotificationActionContext>({
  onGetPushNotificationList: () => {},
  onDeletePushNotification: () => {},
  onCreatePushNotification: () => {},
  onGetPushNotification: () => {},
  onUpdatePushNotification: () => {}
})
