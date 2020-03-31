import React from 'react'
import { Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import DataTable from '@src/components/table/DataTable'
import TextInputAdapter from '@src/components/finalForm/TextInputAdapter'
import { DATE_TIME_PLACEHOLDER } from '@src/common/constants'

const useStyle = makeStyles({
  root: {
    '& .MuiGrid-container .MuiGrid-item': {
      padding: '15px 20px'
    }
  }
})

interface Prop {
  title: string
  classnames?: string
  innerRef?: React.RefObject<any>
  startLabel: string
  startName: string
  endLabel: string
  endName: string
}
export default function StartEndForm({ classnames, title, innerRef, startLabel, startName, endLabel, endName }: Prop) {
  const classes = useStyle()
  return (
    <DataTable
      title={title}
      tableClass={clsx(classes.root, classnames)}
      innerRef={innerRef}
      dataSet={[
        {
          label: startLabel,
          content: <Field name={startName} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
        },
        {
          label: endLabel,
          content: <Field name={endName} component={TextInputAdapter} placeholder={DATE_TIME_PLACEHOLDER} />
        }
      ]}
    />
  )
}