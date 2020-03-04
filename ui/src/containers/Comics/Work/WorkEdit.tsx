import React from 'react'
import { mockWork } from './mockData/mockWork'
import WorkForm from './WorkForm'

export default function WorkEdit() {
  return (
    <>
      <WorkForm workData={mockWork} />
    </>
  )
}
