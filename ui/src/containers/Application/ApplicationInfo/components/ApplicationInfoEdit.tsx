import React, { useContext, useCallback } from 'react'
import ApplicationInfoForm from './ApplicationInfoForm'
import ApplicationInfoContext from '../context/ApplicationInfoContext'

export default function ApplicationInfoEdit() {
  const { currentInfo } = useContext(ApplicationInfoContext)
  const handleSubmit = useCallback(data => {
    console.log(data)
  }, [])

  return (
    <>
      <ApplicationInfoForm onSubmit={handleSubmit} currentInfo={currentInfo} />
    </>
  )
}
