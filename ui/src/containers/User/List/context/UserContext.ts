import { createContext } from 'react'
import User from '@src/models/user/user'

interface UserContext {
  userList: any[]
  currentUser?: any
  userTotal: number
  csvExportLogs: any[]
  csvLogsTotal: number
}

export default createContext<UserContext>({
  userList: [],
  userTotal: 0,
  csvExportLogs: [],
  csvLogsTotal: 0
})

interface ActionContext {
  onGetUserList: () => void
  onGetUser: (_: string) => void
  onGetUserExportLog: () => void
  onCreateUser: (_: User) => void
  onImportUsers: (_: any) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetUserList: () => {},
  onGetUser: (_: string) => {},
  onGetUserExportLog: () => {},
  onCreateUser: (_: User) => {},
  onImportUsers: (_: any) => {}
})
