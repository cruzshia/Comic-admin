import React, { useCallback } from 'react'
import CoinDeliveryEventForm from './CoinDeliveryEventForm'

export default function CoinDeliveryEventCreation() {
  const handleSubmit = useCallback(data => console.log(data), [])
  return (
    <>
      <CoinDeliveryEventForm onSubmit={handleSubmit} />
    </>
  )
}
