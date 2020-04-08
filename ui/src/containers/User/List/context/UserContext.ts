import { createContext } from 'react'

interface UserContext {
  userList: any[]
  currentUser?: any
  userTotal: number
}

export default createContext<UserContext>({
  userList: [],
  userTotal: 0
})
