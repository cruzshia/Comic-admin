import { createContext } from 'react'

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
