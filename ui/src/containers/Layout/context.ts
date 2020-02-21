import { createContext } from 'react'

const LayoutContext = createContext<{
  headTab?: string
}>({})

export default LayoutContext
