import React from 'react'
import { Field } from 'react-final-form'
import { styled } from '@material-ui/core'
import Checkbox from '@src/components/finalForm/CheckboxInputAdapter'

interface Props {
  value: any
  name: string
  label: string
}

const Label = styled('label')({
  display: 'inline-block',
  margin: '0 40px 0 15px',
  verticalAlign: 'middle'
})

export default function LabelCheckboxMUI({ name, label, value }: Props) {
  return (
    <>
      <Field name={name} id={`${name}-${value}`} type='checkbox' component={Checkbox} value={value} />
      <Label htmlFor={`${name}-${value}`}>{label}</Label>
    </>
  )
}
