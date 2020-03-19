import React, { useCallback } from 'react'
import NGWordList from './components/NGWordList'

export default function NGWord() {
  const handleSubmit = useCallback(value => () => {}, [])
  return <NGWordList onSubmit={handleSubmit} defaultValue='' />
}
