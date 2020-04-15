import React, { useCallback } from 'react'
import ApplicationInfoForm from './ApplicationInfoForm'

export default function ApplicationInfoCreation() {
  const handleSubmit = useCallback(data => {
    console.log(data)
  }, [])

  return <ApplicationInfoForm onSubmit={handleSubmit} />
}
