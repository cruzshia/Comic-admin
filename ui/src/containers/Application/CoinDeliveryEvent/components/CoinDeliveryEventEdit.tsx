import React, { useCallback, useContext } from 'react'
import CoinDeliveryEventForm from './CoinDeliveryEventForm'
import CoinEventContext from '../context/CoinDeliveryEventContext'

export default function CoinDeliveryEventEdit() {
  const { currentEvent } = useContext(CoinEventContext)
  const handleSubmit = useCallback(data => console.log(data), [])
  return (
    <>
      <CoinDeliveryEventForm onSubmit={handleSubmit} coinDeliveryEvent={currentEvent} />
    </>
  )
}
