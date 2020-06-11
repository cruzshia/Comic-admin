import React from 'react'
import { Field } from 'react-final-form'
import { TextInputAdapter } from '@src/components/finalForm'
import DataTable, { toDataSet } from '@src/components/table/DataTable'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'

interface Prop {
  title: string
  innerRef?: React.RefObject<any>
  startLabel1: string
  startName1: string
  startLabel2: string
  startName2?: string
  endLabel1: string
  endName1: string
  endLabel2: string
  endName2?: string
}

export default function StartEndGroupForm({
  title,
  innerRef,
  startLabel1,
  startName1,
  startLabel2,
  startName2,
  endLabel1,
  endName1,
  endLabel2,
  endName2
}: Prop) {
  return (
    <DataTable
      title={title}
      innerRef={innerRef}
      dataSet={[
        toDataSet(
          startLabel1,
          <Field name={startName1} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
        ),
        toDataSet(
          endLabel1,
          <Field name={endName1} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
        ),
        ...(startName2 && endName2
          ? [
              toDataSet(
                startLabel2,
                <Field name={startName2} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
              ),
              toDataSet(
                endLabel2,
                <Field name={endName2} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
              )
            ]
          : [])
      ]}
      marginBottom
    />
  )
}
