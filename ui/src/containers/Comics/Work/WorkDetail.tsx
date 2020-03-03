import React from 'react'
import { useParams } from 'react-router-dom'

export default function WorkDetail() {
  const { id } = useParams()
  return <>Work detail: {id}</>
}
