import React from 'react'
import { useParams } from 'react-router-dom'

export default function WorkEdit() {
  const { id } = useParams()
  return <>Work edit: {id}</>
}
