import { createContext } from 'react'
import PushNotification, { SearchParam } from '@src/models/application/pushNotification'

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
  onGetPushNotificationList: (_?: Partial<SearchParam>) => void
  onDeletePushNotification: (_: string[]) => void
  onCreatePushNotification: (_: Partial<PushNotification>) => void
  onGetPushNotification: (_: string) => void
  onUpdatePushNotification: (_: Partial<PushNotification>) => void
}

export const ActionContext = createContext<PushNotificationActionContext>({
  onGetPushNotificationList: () => {},
  onDeletePushNotification: () => {},
  onCreatePushNotification: () => {},
  onGetPushNotification: () => {},
  onUpdatePushNotification: () => {}
})
