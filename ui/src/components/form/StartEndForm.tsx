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
  startLabel: string
  startName: string
  startPlaceholder?: string
  endLabel: string
  endName: string
  endPlaceholder?: string
  classnames?: string
  innerRef?: React.RefObject<any>
  marginBottom?: boolean
}
export default function StartEndForm({
  classnames,
  title,
  innerRef,
  startLabel,
  startName,
  startPlaceholder,
  endLabel,
  endName,
  endPlaceholder,
  marginBottom
}: Prop) {
  const classes = useStyle()
  return (
    <DataTable
      title={title}
      tableClass={clsx(classes.root, classnames)}
      innerRef={innerRef}
      dataSet={[
        {
          label: startLabel,
          content: (
            <Field
              name={startName}
              component={TextInputAdapter}
              placeholder={startPlaceholder || DATE_TIME_PLACEHOLDER}
            />
          )
        },
        {
          label: endLabel,
          content: (
            <Field name={endName} component={TextInputAdapter} placeholder={endPlaceholder || DATE_TIME_PLACEHOLDER} />
          )
        }
      ]}
      marginBottom={marginBottom}
    />
  )
}
