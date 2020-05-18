import { createContext } from 'react'
import User from '@src/models/user/user'

interface UserContext {
  userList: any[]
  currentUser?: any
  userTotal: number
  csvExportLogs: any[]
  csvImportLogs: any[]
  csvExportLogsTotal: number
  csvImportLogsTotal: number
}

export default createContext<UserContext>({
  userList: [],
  userTotal: 0,
  csvExportLogs: [],
  csvImportLogs: [],
  csvExportLogsTotal: 0,
  csvImportLogsTotal: 0
})

interface ActionContext {
  onGetUserList: () => void
  onGetUser: (_: string) => void
  onGetUserExportLogList: () => void
  onGetUserImportLogList: () => void
  onCreateUser: (_: User) => void
  onImportUsers: (_: any) => void
}

export const ActionContext = createContext<ActionContext>({
  onGetUserList: () => {},
  onGetUser: (_: string) => {},
  onGetUserExportLogList: () => {},
  onGetUserImportLogList: () => {},
  onCreateUser: (_: User) => {},
  onImportUsers: (_: any) => {}
})
